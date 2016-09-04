module.exports = {

  excludeFiles: ['node_modules/**'],

  disallowAttributeInterpolation: true,
  disallowBlockExpansion: true,
  disallowClassAttributeWithStaticValue: true,
  disallowClassLiteralsBeforeIdLiterals: true,
  disallowDuplicateAttributes: true,
  disallowHtmlText: false,
  disallowIdAttributeWithStaticValue: true,
  disallowLegacyMixinCall: true,
  disallowMultipleLineBreaks: true,
  disallowStringConcatenation: true,
  requireClassLiteralsBeforeAttributes: true,
  requireIdLiteralsBeforeAttributes: true,
  requireLineFeedAtFileEnd: true,
  requireLowerCaseAttributes: true,
  requireLowerCaseTags: true,
  requireSpaceAfterCodeOperator: true,
  requireSpacesInsideAttributeBrackets: true,
  requireStrictEqualityOperators: true,
  validateAttributeQuoteMarks: "'",
  validateAttributeSeparator: {
    separator: ' ',
    multiLineSeparator: '\n '
  },
  validateDivTags: true,
  validateExtensions: true,
  validateIndentation: 2,
  validateLineBreaks: 'LF',
  validateSelfClosingTags: true,
  validateTemplateString: true,

};
