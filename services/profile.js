import api from "./api.js";

export async function getSchoolList(token) {
  return await api.get("/minhas-escolas-perfil", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export async function updateSchoolList(token, schoolId) {
  return await api.post("/atualizar-escolas", {
    escolas: schoolId
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  );
}

export async function searchSchools(token, params) {
  return await api.get("/pesquisar-escolas", {
    params,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export async function getCities(token) {
  return await api.get("/municipios", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export async function getSchoolsAndClassList(token) {
  return await api.get("/minhas-escolas", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export async function getClassList(token, schoolId) {
  return await api.get(`/turmas?escola=${schoolId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export async function updateClassList(token, classId) {
  return await api.post("/atualizar-turmas", {
    turmas: classId
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  );
}

export async function updateDisciplinesList(token, disciplineId) {
  return await api.post("/atualizar-disciplinas", {
    disciplinas: disciplineId
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  );
}

export async function deleteAccount(token, password) {
  return await api.post("/excluir-conta", {
    disciplinas: password
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  );
}

export async function getDisciplinesList(token) {
  return await api.get("/minhas-disciplinas", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export async function updateEmail(token, email) {
  return await api.post("/alterar-email", {
    email: email
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  );
}

export async function updatePassword(token, { password, newPassword }) {
  return await api.post("/alterar-senha", {
    senha_atual: password,
    nova_senha: newPassword
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  );
}
export async function updatePhoto(token, photo) {
  return await api.post("/edit-photo",
    photo,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }
  );
}