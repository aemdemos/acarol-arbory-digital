/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import embed__video_1Parser from './parsers/embed__video_1.js';
import hero2Parser from './parsers/hero2.js';
import hero3Parser from './parsers/hero3.js';
import hero4Parser from './parsers/hero4.js';
import hero5Parser from './parsers/hero5.js';
import cards__no_images_6Parser from './parsers/cards__no_images_6.js';
import cards7Parser from './parsers/cards7.js';
import hero8Parser from './parsers/hero8.js';
import hero9Parser from './parsers/hero9.js';
import video10Parser from './parsers/video10.js';
import hero11Parser from './parsers/hero11.js';
import hero12Parser from './parsers/hero12.js';
import hero13Parser from './parsers/hero13.js';
import hero14Parser from './parsers/hero14.js';
import embed__video_15Parser from './parsers/embed__video_15.js';
import embed__video_16Parser from './parsers/embed__video_16.js';
import hero17Parser from './parsers/hero17.js';
import hero19Parser from './parsers/hero19.js';
import table__striped___bordered_20Parser from './parsers/table__striped___bordered_20.js';
import hero21Parser from './parsers/hero21.js';
import columns__three_columns_22Parser from './parsers/columns__three_columns_22.js';
import hero23Parser from './parsers/hero23.js';
import embed__video_25Parser from './parsers/embed__video_25.js';
import embed__video_26Parser from './parsers/embed__video_26.js';
import embed__video_27Parser from './parsers/embed__video_27.js';
import hero28Parser from './parsers/hero28.js';
import cards29Parser from './parsers/cards29.js';
import hero30Parser from './parsers/hero30.js';
import columns__three_columns_31Parser from './parsers/columns__three_columns_31.js';
import hero32Parser from './parsers/hero32.js';
import cards__no_images_33Parser from './parsers/cards__no_images_33.js';
import cards34Parser from './parsers/cards34.js';
import columns__three_columns_35Parser from './parsers/columns__three_columns_35.js';
import table__no_header_36Parser from './parsers/table__no_header_36.js';
import hero37Parser from './parsers/hero37.js';
import cards38Parser from './parsers/cards38.js';
import hero41Parser from './parsers/hero41.js';
import table__striped___bordered_42Parser from './parsers/table__striped___bordered_42.js';
import hero43Parser from './parsers/hero43.js';
import hero44Parser from './parsers/hero44.js';
import columns__three_columns_45Parser from './parsers/columns__three_columns_45.js';
import embed__video_46Parser from './parsers/embed__video_46.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
  Metadata: metadataParser,
      'Embed (video) 1': embed__video_1Parser,
    'Hero 2': hero2Parser,
    'Hero 3': hero3Parser,
    'Hero 4': hero4Parser,
    'Hero 5': hero5Parser,
    'Cards (no images) 6': cards__no_images_6Parser,
    'Cards 7': cards7Parser,
    'Hero 8': hero8Parser,
    'Hero 9': hero9Parser,
    'Video 10': video10Parser,
    'Hero 11': hero11Parser,
    'Hero 12': hero12Parser,
    'Hero 13': hero13Parser,
    'Hero 14': hero14Parser,
    'Embed (video) 15': embed__video_15Parser,
    'Embed (video) 16': embed__video_16Parser,
    'Hero 17': hero17Parser,
    'Hero 19': hero19Parser,
    'Table (striped & bordered) 20': table__striped___bordered_20Parser,
    'Hero 21': hero21Parser,
    'Columns (three columns) 22': columns__three_columns_22Parser,
    'Hero 23': hero23Parser,
    'Embed (video) 25': embed__video_25Parser,
    'Embed (video) 26': embed__video_26Parser,
    'Embed (video) 27': embed__video_27Parser,
    'Hero 28': hero28Parser,
    'Cards 29': cards29Parser,
    'Hero 30': hero30Parser,
    'Columns (three columns) 31': columns__three_columns_31Parser,
    'Hero 32': hero32Parser,
    'Cards (no images) 33': cards__no_images_33Parser,
    'Cards 34': cards34Parser,
    'Columns (three columns) 35': columns__three_columns_35Parser,
    'Table (no header) 36': table__no_header_36Parser,
    'Hero 37': hero37Parser,
    'Cards 38': cards38Parser,
    'Hero 41': hero41Parser,
    'Table (striped & bordered) 42': table__striped___bordered_42Parser,
    'Hero 43': hero43Parser,
    'Hero 44': hero44Parser,
    'Columns (three columns) 45': columns__three_columns_45Parser,
    'Embed (video) 46': embed__video_46Parser,
};

const pageElements = [
  {
    name: 'Metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // get dom elements for each block on the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });

  // remove fragment elements from the current page
  fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath))
    .forEach((element) => {
      element.remove();
    });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = cluster ? `${name} ${cluster}` : name;
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    let items = null;
    try {
      items = parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
    // remove empty items
    if (Array.isArray(items)) {
      items = items.filter((item) => item);
    }
    if (!WebImporter.Import.isEmpty(items)) {
      // create the block
      const block = WebImporter.Blocks.createBlock(document, {
        name,
        cells: items,
      });
      if (block) {
        // add block to DOM
        main.append(block);
      }
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
