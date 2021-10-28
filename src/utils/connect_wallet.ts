declare const window: any;

/**
 * Connecta a la wallet de metamask.
 * 
 * @returns {Web3}
 */
export default async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Set el session storage
      sessionStorage.setItem('connected', 'true');
      return accounts[0];
    } catch (error) {
      return false;
    }
  }
}

/**
 * Chequea si el wallet ya esta en el sessionStorage.
 * 
 * @returns {boolean}
 */
export function checkWallet() {
  return sessionStorage.getItem('connected') && sessionStorage.getItem('connected') === 'true';
}