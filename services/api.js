import axios from "axios";

export default api = axios.create({
  baseURL: "https://homologacao.sistemamaissaber.com.br/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const mySchoolsAndClasses = ({disciplineId, token}) => {
  return api.get("/minhas-escolas", {
    params: {
      id_disciplina: disciplineId
    },
    headers: {
      "Authorization": "Bearer " + token
    }
  });
}

export const saveResponses = (body, token) => {
  api.post(
    "/avaliacoes/inserir-respostas",
    body,
    {
      headers: {
        "Authorization": token
      }
    }
  )
};

export const getExamQuestions = ({examId, userId}, token) => {
  return api.get(`/avaliacoes/aluno-respostas?id_avaliacao=${examId}&id_user=${userId}`, {
    headers: {
      "Authorization": token
    }
  })
};

export const submitStudentExam = (body, token) => {
  api.post(
    "/avaliacoes/entregar-respostas",
    body,
    {
      headers: {
        "Authorization": token
      }
    }
  )
}