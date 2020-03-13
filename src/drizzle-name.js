class DrizzleName {
  constructor() {
    this.index = 0
  }
  create() {
    const name = 'drz-gr-' + this.index
    this.index++
    return name
  }
}

export const drizzleName = new DrizzleName()
