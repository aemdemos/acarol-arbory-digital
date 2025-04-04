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
/* global WebImporter */
/* eslint-disable no-console */
import embedVideo1Parser from './parsers/embedVideo1.js';
import hero2Parser from './parsers/hero2.js';
import hero3Parser from './parsers/hero3.js';
import hero4Parser from './parsers/hero4.js';
import hero5Parser from './parsers/hero5.js';
import cardsNoImages6Parser from './parsers/cardsNoImages6.js';
import cards7Parser from './parsers/cards7.js';
import hero8Parser from './parsers/hero8.js';
import hero9Parser from './parsers/hero9.js';
import video10Parser from './parsers/video10.js';
import hero11Parser from './parsers/hero11.js';
import hero12Parser from './parsers/hero12.js';
import hero13Parser from './parsers/hero13.js';
import hero14Parser from './parsers/hero14.js';
import embedVideo15Parser from './parsers/embedVideo15.js';
import embedVideo16Parser from './parsers/embedVideo16.js';
import hero17Parser from './parsers/hero17.js';
import hero19Parser from './parsers/hero19.js';
import tableStripedBordered20Parser from './parsers/tableStripedBordered20.js';
import hero21Parser from './parsers/hero21.js';
import columnsThreeColumns22Parser from './parsers/columnsThreeColumns22.js';
import hero23Parser from './parsers/hero23.js';
import embedVideo25Parser from './parsers/embedVideo25.js';
import embedVideo26Parser from './parsers/embedVideo26.js';
import embedVideo27Parser from './parsers/embedVideo27.js';
import hero28Parser from './parsers/hero28.js';
import cards29Parser from './parsers/cards29.js';
import hero30Parser from './parsers/hero30.js';
import columnsThreeColumns31Parser from './parsers/columnsThreeColumns31.js';
import hero32Parser from './parsers/hero32.js';
import cardsNoImages33Parser from './parsers/cardsNoImages33.js';
import cards34Parser from './parsers/cards34.js';
import columnsThreeColumns35Parser from './parsers/columnsThreeColumns35.js';
import tableNoHeader36Parser from './parsers/tableNoHeader36.js';
import hero37Parser from './parsers/hero37.js';
import cards38Parser from './parsers/cards38.js';
import hero41Parser from './parsers/hero41.js';
import tableStripedBordered42Parser from './parsers/tableStripedBordered42.js';
import hero43Parser from './parsers/hero43.js';
import hero44Parser from './parsers/hero44.js';
import columnsThreeColumns45Parser from './parsers/columnsThreeColumns45.js';
import embedVideo46Parser from './parsers/embedVideo46.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  embedVideo1: embedVideo1Parser,
  hero2: hero2Parser,
  hero3: hero3Parser,
  hero4: hero4Parser,
  hero5: hero5Parser,
  cardsNoImages6: cardsNoImages6Parser,
  cards7: cards7Parser,
  hero8: hero8Parser,
  hero9: hero9Parser,
  video10: video10Parser,
  hero11: hero11Parser,
  hero12: hero12Parser,
  hero13: hero13Parser,
  hero14: hero14Parser,
  embedVideo15: embedVideo15Parser,
  embedVideo16: embedVideo16Parser,
  hero17: hero17Parser,
  hero19: hero19Parser,
  tableStripedBordered20: tableStripedBordered20Parser,
  hero21: hero21Parser,
  columnsThreeColumns22: columnsThreeColumns22Parser,
  hero23: hero23Parser,
  embedVideo25: embedVideo25Parser,
  embedVideo26: embedVideo26Parser,
  embedVideo27: embedVideo27Parser,
  hero28: hero28Parser,
  cards29: cards29Parser,
  hero30: hero30Parser,
  columnsThreeColumns31: columnsThreeColumns31Parser,
  hero32: hero32Parser,
  cardsNoImages33: cardsNoImages33Parser,
  cards34: cards34Parser,
  columnsThreeColumns35: columnsThreeColumns35Parser,
  tableNoHeader36: tableNoHeader36Parser,
  hero37: hero37Parser,
  cards38: cards38Parser,
  hero41: hero41Parser,
  tableStripedBordered42: tableStripedBordered42Parser,
  hero43: hero43Parser,
  hero44: hero44Parser,
  columnsThreeColumns45: columnsThreeColumns45Parser,
  embedVideo46: embedVideo46Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
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
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
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
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
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
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
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
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

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

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
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
