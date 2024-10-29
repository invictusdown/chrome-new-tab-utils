export class PWAManager {
  constructor() {
    this.initializeInstallPrompt();
  }

  private async initializeInstallPrompt() {
    const installButton = document.getElementById('installBtn');
    if (!installButton) return;

    let deferredPrompt: any;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installButton.classList.remove('hidden');
    });

    installButton.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      installButton.classList.add('hidden');
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Installation ${outcome}`);
      deferredPrompt = null;
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully');
    });
  }
}

export const initPWA = () => {
  new PWAManager();
};