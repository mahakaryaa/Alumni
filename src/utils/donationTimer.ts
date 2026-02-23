/**
 * Donation Timer Persistence Utility
 * Manages donation timer state in localStorage
 * Part of FASE 4 implementation
 */

export interface DonationTimerState {
  donationId: string;
  projectId: string;
  projectTitle: string;
  amount: string;
  createdAt: string; // ISO timestamp
  expiryAt: string; // ISO timestamp
  paymentMethod: string;
  uniqueCode: number;
  referenceNumber: string;
  isExpired: boolean;
  proofSubmitted: boolean;
}

const STORAGE_KEY = 'almaqdisi_active_donations';

/**
 * Get all active donation timers
 */
export function getActiveDonations(): DonationTimerState[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const donations: DonationTimerState[] = JSON.parse(stored);
    
    // Filter out expired donations (older than 24 hours)
    const now = new Date().getTime();
    const activeDonations = donations.filter(donation => {
      const expiryTime = new Date(donation.expiryAt).getTime();
      return expiryTime > now && !donation.proofSubmitted;
    });
    
    // Update localStorage if we filtered any out
    if (activeDonations.length !== donations.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeDonations));
    }
    
    return activeDonations;
  } catch (error) {
    console.error('Error reading active donations:', error);
    return [];
  }
}

/**
 * Add a new donation timer
 */
export function addDonationTimer(donation: DonationTimerState): void {
  try {
    const activeDonations = getActiveDonations();
    
    // Check if donation already exists (by reference number)
    const existingIndex = activeDonations.findIndex(
      d => d.referenceNumber === donation.referenceNumber
    );
    
    if (existingIndex >= 0) {
      // Update existing donation
      activeDonations[existingIndex] = donation;
    } else {
      // Add new donation
      activeDonations.push(donation);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeDonations));
  } catch (error) {
    console.error('Error adding donation timer:', error);
  }
}

/**
 * Update donation timer state
 */
export function updateDonationTimer(
  referenceNumber: string,
  updates: Partial<DonationTimerState>
): void {
  try {
    const activeDonations = getActiveDonations();
    const index = activeDonations.findIndex(
      d => d.referenceNumber === referenceNumber
    );
    
    if (index >= 0) {
      activeDonations[index] = { ...activeDonations[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeDonations));
    }
  } catch (error) {
    console.error('Error updating donation timer:', error);
  }
}

/**
 * Remove donation timer
 */
export function removeDonationTimer(referenceNumber: string): void {
  try {
    const activeDonations = getActiveDonations();
    const filtered = activeDonations.filter(
      d => d.referenceNumber !== referenceNumber
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing donation timer:', error);
  }
}

/**
 * Get specific donation by reference number
 */
export function getDonationByReference(referenceNumber: string): DonationTimerState | null {
  try {
    const activeDonations = getActiveDonations();
    return activeDonations.find(d => d.referenceNumber === referenceNumber) || null;
  } catch (error) {
    console.error('Error getting donation:', error);
    return null;
  }
}

/**
 * Mark donation as expired
 */
export function markDonationAsExpired(referenceNumber: string): void {
  updateDonationTimer(referenceNumber, { isExpired: true });
}

/**
 * Mark donation proof as submitted
 */
export function markProofSubmitted(referenceNumber: string): void {
  updateDonationTimer(referenceNumber, { proofSubmitted: true });
}

/**
 * Get donations expiring soon (within specified hours)
 */
export function getDonationsExpiringSoon(withinHours: number = 3): DonationTimerState[] {
  try {
    const activeDonations = getActiveDonations();
    const now = new Date().getTime();
    const thresholdTime = now + (withinHours * 60 * 60 * 1000);
    
    return activeDonations.filter(donation => {
      const expiryTime = new Date(donation.expiryAt).getTime();
      return expiryTime <= thresholdTime && expiryTime > now && !donation.isExpired;
    });
  } catch (error) {
    console.error('Error getting expiring donations:', error);
    return [];
  }
}

/**
 * Clear all donation timers (useful for testing or logout)
 */
export function clearAllDonationTimers(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing donation timers:', error);
  }
}

/**
 * Check if user has active donations for a specific project
 */
export function hasActiveDonationForProject(projectId: string): boolean {
  const activeDonations = getActiveDonations();
  return activeDonations.some(d => d.projectId === projectId && !d.proofSubmitted);
}

/**
 * Get total active donations count
 */
export function getActiveDonationsCount(): number {
  return getActiveDonations().length;
}
