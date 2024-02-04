export class ParserString {
  pars(args) {
    if (!data || !Array.isArray(args)) return null;
    const data = args.split(" ");

    const command = data.reverse().pop();

    const params = data.reverse();

    return { command, params };
  }
}
