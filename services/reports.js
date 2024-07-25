import api from "./api.js";

export const getExamsReport = async (token, { schoolId, schoolClassId, disciplineId }) => {
  return api.get("/avaliacoes", {
    params: {
      disciplina: disciplineId,
      escola: schoolId,
      turma: schoolClassId
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
};

export const getQuestionQuantitativeReport = async (token, { schoolId, classId, examId }) => {
  return api.get("/relatorio-quantitativo-questoes", {
    params: {
      escola: schoolId,
      turma: classId,
      avaliacao: examId
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
};

export const getQuestions = async (token, { examId }) => {
  return api.get("/avaliacoes/questoes", {
    params: {
      avaliacao: examId
    },
    headers: {
      "Authorization": 'Bearer ' + token
    }
  })
}
export const getStudentQuestions = async (token, { examId, studentId }) => {
  return api.get("/avaliacoes/questoes", {
    params: {
      avaliacao: examId,
      aluno: studentId
    },
    headers: {
      "Authorization": 'Bearer ' + token
    }
  })
}

export const getSkillsQualitativeReport = async (token, { schoolId, classId, examId, filtro }) => {
  return api.get("/relatorio-qualitativo", {
    params: {
      escola: schoolId,
      turma: classId,
      avaliacao: examId,
      filtro: filtro,
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
};

export const getQuestionQualitativeReport = async (token, { schoolId, classId, examId, questionId }) => {
  return api.get("/relatorio-qualitativo-questao", {
    params: {
      escola: schoolId,
      turma: classId,
      avaliacao: examId,
      questao: questionId
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
};

export const getStudentQuantitativeReport = async (token, { schoolId, classId, examId }) => {
  return api.get("/relatorio-quantitativo-niveis-alunos", {
    params: {
      escola: schoolId,
      turma: classId,
      avaliacao: examId
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
};

export const getStudentReport = async (token, { examId, studentId }) => {
  return api.get("/relatorio-aproveitamento-turma-aluno", {
    params: {
      avaliacao: examId,
      aluno: studentId
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}
export const getStudentResponse = async (token, { examId, studentId }) => {
  return api.get("/relatorio-quantitativo-aluno", {
    params: {
      avaliacao: examId,
      aluno: studentId
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}
export const getStudentResponsesSkill = async (token, { examId, studentId }) => {
  return api.get("/relatorio-aproveitamento-habilidade-aluno", {
    params: {
      avaliacao: examId,
      aluno: studentId
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}


