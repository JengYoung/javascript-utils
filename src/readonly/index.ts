const readonly = (object: any) => {
  if (object?.constructor?.name !== 'Object') return object;
  
  
  for (const key in object) {
    object[key] = readonly(object[key]);
  }

  object = Object.freeze(object);

  return object;
}

export default readonly;