/**
 * The import rules object defines elements that can be removed (cleanup) from the source
 * document and elements that should be transformed into blocks.
 */
/* eslint-disable comma-dangle */
const importRules = {
  cleanup: {
    start: [],
    end: [
      'style',
      'source',
      'script',
      'noscript',
      'iframe',
      'link'
    ]
  },
  blocks: [
    {
      type: 'metadata',
      selectors: [],
      variants: []
    },
    {
      type: 'Embed1',
      params: {
        name: 'Embed (video)',
        cluster: 1,
        block: 'Embed',
        id: 'embed1'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero2',
      params: {
        name: 'Hero',
        cluster: 2,
        block: 'Hero',
        id: 'hero2'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero3',
      params: {
        name: 'Hero',
        cluster: 3,
        block: 'Hero',
        id: 'hero3'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero4',
      params: {
        name: 'Hero',
        cluster: 4,
        block: 'Hero',
        id: 'hero4'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero5',
      params: {
        name: 'Hero',
        cluster: 5,
        block: 'Hero',
        id: 'hero5'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards (no images)6',
      params: {
        name: 'Cards (no images)',
        cluster: 6,
        block: 'Cards (no images)',
        id: 'cardsNoImages6'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards7',
      params: {
        name: 'Cards',
        cluster: 7,
        block: 'Cards',
        id: 'cards7'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero8',
      params: {
        name: 'Hero',
        cluster: 8,
        block: 'Hero',
        id: 'hero8'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero9',
      params: {
        name: 'Hero',
        cluster: 9,
        block: 'Hero',
        id: 'hero9'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Video10',
      params: {
        name: 'Video',
        cluster: 10,
        block: 'Video',
        id: 'video10'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero11',
      params: {
        name: 'Hero',
        cluster: 11,
        block: 'Hero',
        id: 'hero11'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero12',
      params: {
        name: 'Hero',
        cluster: 12,
        block: 'Hero',
        id: 'hero12'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero13',
      params: {
        name: 'Hero',
        cluster: 13,
        block: 'Hero',
        id: 'hero13'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero14',
      params: {
        name: 'Hero',
        cluster: 14,
        block: 'Hero',
        id: 'hero14'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Embed15',
      params: {
        name: 'Embed (video)',
        cluster: 15,
        block: 'Embed',
        id: 'embed15'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Embed16',
      params: {
        name: 'Embed (video)',
        cluster: 16,
        block: 'Embed',
        id: 'embed16'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero17',
      params: {
        name: 'Hero',
        cluster: 17,
        block: 'Hero',
        id: 'hero17'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero19',
      params: {
        name: 'Hero',
        cluster: 19,
        block: 'Hero',
        id: 'hero19'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Table (striped, bordered)20',
      params: {
        name: 'Table (striped & bordered)',
        cluster: 20,
        block: 'Table (striped, bordered)',
        id: 'tableStripedBordered20'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero21',
      params: {
        name: 'Hero',
        cluster: 21,
        block: 'Hero',
        id: 'hero21'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns22',
      params: {
        name: 'Columns (three columns)',
        cluster: 22,
        block: 'Columns',
        id: 'columns22'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero23',
      params: {
        name: 'Hero',
        cluster: 23,
        block: 'Hero',
        id: 'hero23'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Embed25',
      params: {
        name: 'Embed (video)',
        cluster: 25,
        block: 'Embed',
        id: 'embed25'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Embed26',
      params: {
        name: 'Embed (video)',
        cluster: 26,
        block: 'Embed',
        id: 'embed26'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Embed27',
      params: {
        name: 'Embed (video)',
        cluster: 27,
        block: 'Embed',
        id: 'embed27'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero28',
      params: {
        name: 'Hero',
        cluster: 28,
        block: 'Hero',
        id: 'hero28'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards29',
      params: {
        name: 'Cards',
        cluster: 29,
        block: 'Cards',
        id: 'cards29'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero30',
      params: {
        name: 'Hero',
        cluster: 30,
        block: 'Hero',
        id: 'hero30'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns31',
      params: {
        name: 'Columns (three columns)',
        cluster: 31,
        block: 'Columns',
        id: 'columns31'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero32',
      params: {
        name: 'Hero',
        cluster: 32,
        block: 'Hero',
        id: 'hero32'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards (no images)33',
      params: {
        name: 'Cards (no images)',
        cluster: 33,
        block: 'Cards (no images)',
        id: 'cardsNoImages33'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards34',
      params: {
        name: 'Cards',
        cluster: 34,
        block: 'Cards',
        id: 'cards34'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns35',
      params: {
        name: 'Columns (three columns)',
        cluster: 35,
        block: 'Columns',
        id: 'columns35'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Table (no header)36',
      params: {
        name: 'Table (no header)',
        cluster: 36,
        block: 'Table (no header)',
        id: 'tableNoHeader36'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero37',
      params: {
        name: 'Hero',
        cluster: 37,
        block: 'Hero',
        id: 'hero37'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Cards38',
      params: {
        name: 'Cards',
        cluster: 38,
        block: 'Cards',
        id: 'cards38'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero40',
      params: {
        name: 'Hero',
        cluster: 40,
        block: 'Hero',
        id: 'hero40'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero41',
      params: {
        name: 'Hero',
        cluster: 41,
        block: 'Hero',
        id: 'hero41'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Table (striped, bordered)42',
      params: {
        name: 'Table (striped & bordered)',
        cluster: 42,
        block: 'Table (striped, bordered)',
        id: 'tableStripedBordered42'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero43',
      params: {
        name: 'Hero',
        cluster: 43,
        block: 'Hero',
        id: 'hero43'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Hero44',
      params: {
        name: 'Hero',
        cluster: 44,
        block: 'Hero',
        id: 'hero44'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Columns45',
      params: {
        name: 'Columns (three columns)',
        cluster: 45,
        block: 'Columns',
        id: 'columns45'
      },
      selectors: [],
      variants: []
    },
    {
      type: 'Embed46',
      params: {
        name: 'Embed (video)',
        cluster: 46,
        block: 'Embed',
        id: 'embed46'
      },
      selectors: [],
      variants: []
    }
  ],
  transformers: []
};

export default importRules;