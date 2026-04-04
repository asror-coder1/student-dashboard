let isEditMode = false;
let currentId = null;

window.onload = () => refresh();

async function refresh() {
  document.getElementById("userCount").innerText = await api.count("user");
  document.getElementById("resultCount").innerText = await api.count("result");

  const users = await api.get("user");
  const tbody = document.getElementById("userTable");
  tbody.innerHTML = "";

  users.forEach((u) => {
    tbody.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.fistName} ${u.lastName}</td>
                <td>
                    <button class="btn-edit" onclick="startEdit(${u.id}, '${u.fistName}', '${u.lastName}', ${u.age}, '${u.phoneNumber}', '${u.address}', '${u.gender}')">Tahrirlash</button>
                    <button class="btn-del" onclick="removeUser(${u.id})">O'chirish</button>
                </td>
            </tr>`;
  });
}

async function handleSave() {
  // Inputlardan ma'lumotni yig'amiz
  const userData = {
    fistName: document.getElementById("fName").value,
    lastName: document.getElementById("lName").value,
    age: parseInt(document.getElementById("userAge").value) || 0,
    phoneNumber: document.getElementById("userPhone").value,
    address: document.getElementById("userAddress").value,
    schoolName: "PDP", // Buni ham input qilsang bo'ladi
    gender: document.getElementById("userGender").value,
  };

  if (!userData.fistName || !userData.lastName)
    return alert("Ism va familiyani to'ldiring!");

  if (isEditMode) {
    await api.put("user", currentId, userData);
    resetForm();
  } else {
    const res = await api.post("user", userData);
    if (!res.ok) alert("Xatolik! Backend qabul qilmadi.");
  }

  clearInputs();
  refresh();
}

function startEdit(id, fName, lName, age, phone, addr, gender) {
  isEditMode = true;
  currentId = id;

  // Inputlarni to'ldirish
  document.getElementById("fName").value = fName;
  document.getElementById("lName").value = lName;
  document.getElementById("userAge").value = age;
  document.getElementById("userPhone").value = phone;
  document.getElementById("userAddress").value = addr;
  document.getElementById("userGender").value = gender;

  const btn = document.getElementById("submitBtn");
  btn.innerText = "Saqlash";
  btn.style.background = "#f1c40f";
}

function clearInputs() {
  document.getElementById("fName").value = "";
  document.getElementById("lName").value = "";
  document.getElementById("userAge").value = "";
  document.getElementById("userPhone").value = "";
  document.getElementById("userAddress").value = "";
}

function resetForm() {
  isEditMode = false;
  currentId = null;
  const btn = document.getElementById("submitBtn");
  btn.innerText = "Qo'shish";
  btn.style.background = "#00b894";
  clearInputs();
}

async function removeUser(id) {
  if (confirm("O'chirilsinmi?")) {
    await api.delete("user", id);
    refresh();
  }
}
