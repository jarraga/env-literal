const chalk = require('chalk')

const envLiteral = (debug) => {

    const interpolate = envValue => {

        const matches = envValue.match(/(.?\${?(?:[a-zA-Z0-9_]+)?}?)/g) || []

        return matches.reduce((newEnv, match) => {

            const parts = /(.?)\${?([a-zA-Z0-9_]+)?}?/g.exec(match)
            const prefix = parts[1]

            let value, replacePart

            if (prefix === '\\') {
                replacePart = parts[0]
                value = replacePart.replace('\\$', '$')
            } else {
                const key = parts[2]
                replacePart = parts[0].substring(prefix.length)

                if (process.env.hasOwnProperty(key)) {
                    value = process.env[key]
                } else {
                    value = ''
                    if (debug) {
                        console.error(chalk.bgRedBright.black(
                            ` env Literal => env var ${key} not defined `
                        ))
                    }
                }

                // Resolve recursive interpolations
                value = interpolate(value)
            }

            return newEnv.replace(replacePart, value)
        }, envValue)
    }

    const vars = process.env

    Object.entries(vars).forEach(([key, value]) => {
        process.env[key] = interpolate(value)
    })
}

module.exports = envLiteral