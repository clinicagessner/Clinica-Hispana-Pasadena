// Servicios pausados temporalmente. Para reanudar el I-693: poner false
// (y quitar la coletilla "pausado" de las FAQ y de llms.ts).
export const I693_PAUSADO = true;

export const I693_SERVICE_SLUGS = ["examenes-inmigracion"];
export const I693_POST_SLUGS = [
  "guia-examen-medico-inmigracion-i693-pasadena",
  "medicos-autorizados-uscis-pasadena-civil-surgeon",
];

export const I693_AVISO = {
  es: {
    label: "Aviso",
    text: "el examen médico de inmigración (I-693) está temporalmente pausado hasta nuevo aviso.",
  },
  en: {
    label: "Notice",
    text: "the immigration medical exam (I-693) is temporarily paused until further notice.",
  },
};
