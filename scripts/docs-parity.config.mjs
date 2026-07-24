export const counterpartExceptions = [
  // Keep this list limited to intentional locale-only legal or local pages.
  // Example: { locale: 'de', page: 'legal/example', reason: 'German-only legal requirement' },
];

export const legacyPluginNameExceptions = [
  // Use only when a page intentionally documents a compatibility alias.
  {
    page: 'plugins/managing',
    kind: 'install',
    name: 'github',
    reason: 'The compatibility warning contrasts this legacy alias with the canonical name.',
  },
];
