const formatSkillCode = (boldText, regularText) => {
  const formattedText = regularText.replace(/<\/?p>/g, ' ');
  return `<strong>${boldText} : </strong> ${formattedText}`
};

const formatCommentCode = (boldText, regularText) => {
  const formattedText = regularText.replace(/<\/?p>/g, ' ');
  return `<strong>${boldText} : </strong> ${formattedText}`
};

const formatAlternativesCode = (answer, alternative) => {
  return answer.includes("<p>") ?
    answer.replace("<p>", `<p> <b>${alternative}</b>)`) :
    `${alternative}) ${answer}`
};

export {formatSkillCode, formatAlternativesCode, formatCommentCode}

