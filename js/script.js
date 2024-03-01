'use strict';

(() => {
  const analyzeText = (text) => {
    if (typeof text !== 'string') {
      throw new Error('text must be a valid string');
    }

    const normalizedText = text.trim().toLowerCase().replaceAll(/[0-9!@#$%^&*\(\)_+=\-;:\/\\.><\[\]\{\},?]/gis, '');
    const words = normalizedText.split(' ');
    const wordsRegistry = new Set(words);

    return {
      uniqueWordsCount: wordsRegistry.size,
      uniqueWords: Array.from(wordsRegistry),
    };
  };


try {
console.log(analyzeText(` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque convallis augue iaculis sagittis iaculis. Donec quis nulla efficitur, mattis magna in, vulputate neque. Nullam semper, sem eu pharetra dignissim, elit risus imperdiet libero, vitae malesuada nisi sem et quam. Donec a magna vel leo egestas mattis in vel est. Quisque laoreet nibh nisi, at molestie ante rhoncus a. Fusce nec aliquet enim. Nam ultrices nec risus vitae ultrices. Duis ultricies sed augue non fringilla. Quisque eu dolor mi.

Cras id tellus mauris. Donec ultricies et felis ut pretium. Ut faucibus aliquet congue. Morbi id odio mi. Etiam facilisis efficitur pellentesque. Vivamus dictum imperdiet velit quis facilisis. Duis enim mi, sollicitudin lacinia sem a, vestibulum fringilla nibh.

Nam libero dui, pellentesque nec feugiat sed, varius ac massa. Pellentesque quis tempus lacus. Quisque quis velit ac felis eleifend convallis non vel turpis. Etiam luctus purus ultricies sapien euismod egestas. Morbi tempor risus eget nibh egestas vehicula. Pellentesque viverra metus magna, vel volutpat est mollis eget. Proin et facilisis nisl. Fusce porttitor congue felis sed elementum. Curabitur in erat ac tortor tempus lacinia. Ut et augue non lorem hendrerit egestas. Nulla facilisi. Phasellus ornare faucibus ex, sed rhoncus nisi pharetra et. Maecenas ac tincidunt sapien, vel tempor quam. `));

} catch (e) {
  console.error(e);
}
})();