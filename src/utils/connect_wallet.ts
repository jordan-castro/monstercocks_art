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
      if (accounts.length > 0) {
        // Set el session storage
        sessionStorage.setItem('connected', 'true');
        return accounts[0];
      } else {
        return false;
      }
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

/**
 * Intenta a connectar a un walleto. Usa esto cuando 
 * se necesita una wallet pero no queries preguntar por accesso.
 * 
 * @returns `Promise<string | boolean>`
 */
export const grabWallet = async () => {
  if (checkWallet()) {
    return await connectWallet();
  } else {
    return false;
  }
}