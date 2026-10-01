import { styleText } from "util"

export function logColor(...msg: (string | number)[]) {
  const messages = msg
    .map(message => styleText(["bgCyan", "white"], `${message}`))
    .join(" ")

  console.log(styleText("black", messages))
}
