module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script', // Use 'script' for CommonJS
  },
  rules: {
    // Allow console.log in Node.js
    'no-console': 'off',
    
    // Allow require() statements
    'import/no-commonjs': 'off',
    
    // Allow unused function parameters (common in Express middleware)
    'no-unused-vars': ['error', { 
      argsIgnorePattern: '^(req|res|next|err)$',
      varsIgnorePattern: '^_'
    }],
    
    // Enforce consistent indentation
    'indent': ['error', 2],
    
    // Enforce consistent quotes
    'quotes': ['error', 'single'],
    
    // Enforce semicolons
    'semi': ['error', 'always'],
    
    // Enforce consistent line endings
    'eol-last': ['error', 'always'],
    
    // Disallow trailing spaces
    'no-trailing-spaces': 'error',
    
    // Enforce consistent spacing
    'space-before-blocks': 'error',
    'keyword-spacing': 'error',
    
    // Allow async functions without await
    'require-await': 'off',
    
    // Disallow multiple empty lines
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
  },
  globals: {
    process: 'readonly',
    Buffer: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly',
    module: 'writable',
    exports: 'writable',
    require: 'readonly',
    global: 'readonly',
  },
}; 