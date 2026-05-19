export async function getEspecies() {
  const res = await fetch("http://localhost:5000/api/especies");
  return res.json();
}

export async function getEspecieById(id) {
  const res = await fetch(`http://localhost:5000/api/especies/${id}`);
  return res.json();
}

export async function getChaves() {
  const res = await fetch("http://localhost:5000/api/chaves");
  return res.json();
}