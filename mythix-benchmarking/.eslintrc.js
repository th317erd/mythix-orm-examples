'use strict';

/* eslint-disable no-magic-numbers */

module.exports = {
  'env': {
    'browser':  true,
    'commonjs': true,
    'es2021':   true,
  },
  'extends': [
    'eslint:recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'plugins': [
    '@spothero/eslint-plugin-spothero',
  ],
  'ignorePatterns': [
    'app/config/**',
  ],
  'rules': {
    '@spothero/spothero/ternary-parentheses': 'error',
    'arrow-parens':                           'error',
    'arrow-spacing':                          [ 'error', { before: true, after: true } ],
    'block-scoped-var':                       'warn',
    'block-spacing':                          'error',
    'brace-style':                            [ 'error', '1tbs' ],
    'camelcase':                              'warn',
    'comma-dangle':                           [ 'error', 'always-multiline' ],
    'comma-spacing':                          [ 'error', { before: false, after: true } ],
    'comma-style':                            [ 'error', 'last' ],
    'curly':                                  [ 'error', 'multi-or-nest', 'consistent' ],
    'default-case-last':                      'error',
    'default-param-last':                     'error',
    'eqeqeq':                                 [ 'error', 'smart' ],
    'func-call-spacing':                      [ 'error', 'never' ],
    'guard-for-in':                           'error',
    'implicit-arrow-linebreak':               [ 'error', 'beside' ],
    'indent':                                 [ 'error', 2, { 'SwitchCase': 1, 'MemberExpression': 'off' } ],
    'jsx-quotes':                             [ 'error', 'prefer-double' ],
    'key-spacing':                            [ 'error', { beforeColon: false, afterColon: true, mode: 'minimum', 'align': 'value' } ],
    'keyword-spacing':                        [ 'error', { before: true, after: true } ],
    'linebreak-style':                        [ 'error', 'unix' ],
    'lines-between-class-members':            'error',
    'max-classes-per-file':                   [ 'error', 5 ],
    'new-cap':                                [ 'error', { 'properties': false } ],
    'new-parens':                             'error',
    'no-array-constructor':                   'warn',
    'no-caller':                              'error',
    'no-confusing-arrow':                     'error',
    'no-empty':                               'warn',
    'no-eq-null':                             0,
    'no-eval':                                'error',
    'no-extend-native':                       'error',
    'no-extra-label':                         'error',
    'no-floating-decimal':                    'error',
    'no-global-assign':                       'error',
    'no-implied-eval':                        'error',
    'no-labels':                              'error',
    'no-lone-blocks':                         'warn',
    'no-loop-func':                           'warn',
    'no-magic-numbers':                       [ 'warn', { ignoreArrayIndexes: true, ignoreDefaultValues: true, ignore: [ -1, 0, 1, 2, 16, 32, 40, 64, 128, 256, 1024, 2048, 200, 201, 301, 302, 400, 401, 403, 404, 500, 65565 ] } ],
    'no-nested-ternary':                      'error',
    'no-param-reassign':                      'error',
    'no-promise-executor-return':             'error',
    'no-return-assign':                       'error',
    'no-sequences':                           'error',
    'no-shadow':                              0,
    'no-throw-literal':                       'warn',
    'no-trailing-spaces':                     'error',
    'no-unmodified-loop-condition':           'warn',
    'no-unreachable-loop':                    'warn',
    'no-unreachable':                         'warn',
    'no-unused-private-class-members':        'warn',
    'no-unused-vars':                         'warn',
    'no-whitespace-before-property':          'error',
    'nonblock-statement-body-position':       [ 'error', 'below' ],
    'one-var':                                [ 'error', 'never' ],
    'quotes':                                 [ 'error', 'single' ],
    'radix':                                  'error',
    'rest-spread-spacing':                    [ 'error', 'never' ],
    'semi-spacing':                           [ 'error', { before: false, after: true } ],
    'semi-style':                             [ 'error', 'last' ],
    'semi':                                   'error',
    'space-before-blocks':                    'error',
    'space-infix-ops':                        'error',
    'space-unary-ops':                        [ 'error', { words: false, nonwords: false } ],
    'strict':                                 'error',
    'switch-colon-spacing':                   [ 'error', { before: false, after: true } ],
    'template-curly-spacing':                 'error',
    'template-tag-spacing':                   'error',
    'wrap-iife':                              [ 'error', 'inside' ],
    'yoda':                                   'error',
  },
};
