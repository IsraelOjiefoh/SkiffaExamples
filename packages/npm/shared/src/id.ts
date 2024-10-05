let lastId = Date.now();

export function nextId() {
  const id = ++lastId;
  return id
}

export function nextStringId(prefix: string) {
  const id = nextId();
  return prefix + id.toString(36);
}
