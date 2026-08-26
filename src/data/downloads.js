// Downloads — echOS 2.0 Universal only.
// Public ISO is gated on the Akida hardware validation campaign.

const GITHUB_REPO = 'https://github.com/knightslabs/echos';

export const RELEASE_URL = GITHUB_REPO;

export const UNIVERSAL = {
  id: 'universal',
  version: '2.0.0',
  available: false,
  files: [
    {
      name: 'EchOS-2.0.0-universal-vm.iso',
      targetKey: 'vm',
      format: 'ISO',
      size: '~36 MB',
    },
    {
      name: 'EchOS-2.0.0-universal-metal.iso',
      targetKey: 'metal',
      format: 'ISO',
      size: '~36 MB',
    },
  ],
};
