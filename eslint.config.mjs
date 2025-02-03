import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    {
        ignores: ['dist', 'demo'],
    },
    {
        rules: {
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'no-trailing-spaces': ['error'],
            'semi': ['error', 'never'],
            'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
        }
    }
)
