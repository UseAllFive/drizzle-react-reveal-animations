class AniController {
  constructor() {
    this.groups = {}
  }

  getGroup(groupName) {
    // Create a keyed object for the group
    if (!this.groups[groupName]) {
      this.groups[groupName] = {
        children: {},
        imagesLoaded: {},
        imagesToLoadCount: 0,
        imagesLoadedCount: 0,
        queue: {},
      }
    }
    return this.groups[groupName]
  }

  check(groupSettings, callback) {
    const group = this.getGroup(groupSettings.name)

    // Make a keyed object for the child
    if (!group.children[groupSettings.childId]) {
      group.children[groupSettings.childId] = {}
    }
    const child = group.children[groupSettings.childId]

    // Store some props on this child
    child.key = groupSettings.childId
    child.desiredOrder = groupSettings.order
    child.done = groupSettings.done
    child.callback = callback
    child.imagesLoaded = groupSettings.imagesLoaded
    child.context = groupSettings.context

    // Don't carry on until all images are loaded
    if (group.imagesToLoadCount !== group.imagesLoadedCount) {
      group.queue[child.key] = { groupSettings, callback }
      return
    }

    // If the item is on the board
    if (groupSettings.visible && !child.done) {
      const arr = []

      for (const [key, value] of Object.entries(group.children)) {
        arr.push(value)
      }

      // Get items in group that haven't been revealed
      const filtered = arr.filter((a) => !a.done && !isNaN(a.desiredOrder))

      // sort them by their order property
      filtered.sort((a, b) => {
        return a.desiredOrder > b.desiredOrder ? 1 : -1
      })
      let count = 0
      // This becomes the real order for the child to show
      let childOrder = 0

      // Set a real order, this will be 0,1,2,3 etc;
      // Essentially resets the order if ones have already appeared —
      // e.g. if a el isn't visible yet on the screen, then the user
      // scrolls down, it will show immediately
      filtered.forEach((item) => {
        if (item.key === groupSettings.childId) {
          childOrder = count
        }
        count++
      })

      // all these sad dom elements without an order get popped to the end of the array
      const itemsWithoutOrder = arr.filter((a) => !a.done && isNaN(a.desiredOrder))
      itemsWithoutOrder.forEach((item) => {
        filtered.push(item)
        if (item.key === groupSettings.childId) {
          // let's give this one an order
          childOrder = count
        }
        count++
      })
      // Delay the callback based on the order
      child.timeout = setTimeout(() => {
        // The child is ready to be displayed, hit the callback!
        child.callback()
        delete group.queue[child.key]
      }, childOrder * (child.context.staggerSpeed * 1000))
    } else {
      clearTimeout(group.timeout)
    }
  }

  processQueue(groupName) {
    const group = this.getGroup(groupName)
    for (const [key, item] of Object.entries(group.queue)) {
      this.check(item.groupSettings, item.callback)
    }
  }

  addImagesToLoad(groupName, src) {
    const group = this.getGroup(groupName)
    if (src && src !== '' && !group.imagesLoaded[src]) {
      // new image to load…
      group.imagesLoaded[src] = true
      // increment the count of imgs that we need to load
      group.imagesToLoadCount++

      const dummyImg = new Image()
      dummyImg.addEventListener('load', () => {
        // increment the count of imgs we've loaded
        group.imagesLoadedCount++
        this.processQueue(groupName)
      })
      dummyImg.addEventListener('error', () => {
        // if img fails, we still need to show the group,
        // so increment the img load count
        group.imagesLoadedCount++
        this.processQueue(groupName)
      })
      // load the image
      dummyImg.setAttribute('src', src)
    }
  }

  cleanup(name, childId) {
    delete this.groups[name].children[childId]
    delete this.groups[name].queue[childId]
    clearTimeout(this.groups[name].timeout)
  }
}

export const aniController = new AniController()
