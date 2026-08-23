// Downloads data — EchOS 1.0 "ECLIPSE" release v1.0.0
// SHA256 digests mirror public/downloads/SHA256SUMS.txt

const GITHUB_RELEASE = 'https://github.com/knightslabs/echos/releases/tag/v1.0.0';

export const RELEASE_URL = GITHUB_RELEASE;

export const SHA256_MAP = {
  'EchOS-1.0.0-complete-metal.iso': '42988eb8f6fe95f43cc7ac3f2b08436789b835d6bbe1bc7acd228c4ea2bbeb60',
  'EchOS-1.0.0-complete-vm.iso': '8b96d3cf43e71a9ed46e460315c81edf9be1ba379d8d6b484cc3e7402ca4ff32',
  'EchOS-1.0.0-edge-metal.iso': '13a231b04412a4c87368fecbd06f9ad0c529d2ded367656818fd572ef1de8987',
  'EchOS-1.0.0-edge-vm.iso': '6669dd4799fb2df01ee55ae3563de2543799dd04daa5ab8148ba3f6a91fd1550',
  'EchOS-1.0.0-minimal-metal.iso': '3a197797cd4b7a3792094b5ed00e412c625adfe693471dd23802764334f727bf',
  'EchOS-1.0.0-minimal-vm.iso': '61a2289c5e1042abea9e4328b4d10152e65926af9c441f8c43d83de9312dc91f',
  'EchOS-1.0.0-usb.img.gz': 'dc3bed1c6b2809371471c6f620df4dfba7e346670886702c2636211b4d9d0c6d',
};

function fileRow(name, targetKey, format, size) {
  return {
    name,
    targetKey,
    format,
    size,
    direct: `/downloads/${name}`,
    github: GITHUB_RELEASE,
    sha256: SHA256_MAP[name] || '',
  };
}

export const EDITIONS = [
  {
    id: 'complete',
    sectionKey: 'completeSection',
    anchor: 'complete',
    available: false,
    tba: true,          // Echo AI v1 in final training & testing — date TBA
    files: [
      fileRow('EchOS-1.0.0-complete-metal.iso', 'metal', 'ISO', '34.5 MB'),
      fileRow('EchOS-1.0.0-complete-vm.iso', 'vm', 'ISO', '34.5 MB'),
    ],
  },
  {
    id: 'minimal',
    sectionKey: 'minimalSection',
    anchor: 'minimal',
    available: false,
    releaseDate: '2026-08-30',
    files: [
      fileRow('EchOS-1.0.0-minimal-metal.iso', 'metal', 'ISO', '34.5 MB'),
      fileRow('EchOS-1.0.0-minimal-vm.iso', 'vm', 'ISO', '34.5 MB'),
    ],
  },
  {
    id: 'edge',
    sectionKey: 'edgeSection',
    anchor: 'edge',
    available: false,
    releaseDate: '2026-08-30',
    files: [
      fileRow('EchOS-1.0.0-edge-metal.iso', 'metal', 'ISO', '34.5 MB'),
      fileRow('EchOS-1.0.0-edge-vm.iso', 'vm', 'ISO', '34.5 MB'),
    ],
  },
];

export const USB_FILE = {
  name: 'EchOS-1.0.0-usb.img.gz',
  format: 'IMG.GZ',
  size: '11.4 MB',
  direct: '/downloads/EchOS-1.0.0-usb.img.gz',
  github: GITHUB_RELEASE,
  sha256: SHA256_MAP['EchOS-1.0.0-usb.img.gz'],
};

export const USB_UNCOMPRESSED_SHA256 = '29ac2ae1f94f9a118a515a131028d47317a47f4a33aa7417c172deef63c2016f';
