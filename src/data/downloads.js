// Downloads data — EchOS 1.0 "ECLIPSE" release v1.0.0
// SHA256 digests mirror public/downloads/SHA256SUMS.txt

const GITHUB_RELEASE = 'https://github.com/knightslabs/echos/releases/tag/v1.0.0';

export const RELEASE_URL = GITHUB_RELEASE;

export const SHA256_MAP = {
  'EchOS-1.0.0-complete-metal.iso': 'bf90f1d64060ab66ff283fa285a4f7375af78cb6783e6f1f0d6192c56934d0f7',
  'EchOS-1.0.0-complete-vm.iso': '79fc9b8f79c18bcd9be229730029f81af0a726affee5d8042c7a0f20d5bd0ddf',
  'EchOS-1.0.0-edge-metal.iso': 'ae15f08d167a95e4b4c0ed1d9c10f70c73480d9c0c773adeebd96adb6e838410',
  'EchOS-1.0.0-edge-vm.iso': '11c33ab45862e9ffd34843f5d86e22afb19160f87d85d1729655302708b405a0',
  'EchOS-1.0.0-minimal-metal.iso': 'a00974541796275b8064feb16674ace801c34716300e446129223a37d350ecb4',
  'EchOS-1.0.0-minimal-vm.iso': '149b5e47b4b854a6cf2d29ff10803e9381b4f37e3fc63062c21062e6f5bdff8d',
  'EchOS-1.0.0-usb.img.gz': '0a1b13951def7669ee86b5131f2ec28e198e1bfedbcffa3706ca23828f71ae6b',
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
