import collection from './collection.twig';

import collectionData from './collection.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Collection' };

export const defaultCollection = () => collection(collectionData);
