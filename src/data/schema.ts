import type { SectionDef } from "../types/ds160";
import {
  addressFields,
  dnaText,
  field,
  MARITAL_OPTIONS,
  PASSPORT_TYPE_OPTIONS,
  PAYER_OPTIONS,
  PURPOSE_OPTIONS,
  repeatable,
  SEX_OPTIONS,
  SOCIAL_PLATFORM_OPTIONS,
  SPECIFY_OPTIONS,
  STAY_UNIT_OPTIONS,
  whenNo,
  whenYes,
  yesNo,
} from "./build";

const personal: SectionDef = {
  id: "personal",
  title: {
    en: "Personal Information",
    es: "Información personal",
  },
  fields: [
    field("nameProvided", "text", "Name Provided", "Nombre proporcionado"),
    dnaText(
      "fullNameNative",
      "Full Name in Native Alphabet",
      "Nombre completo en alfabeto nativo",
    ),
    yesNo(
      "otherNamesUsed",
      "Have you ever used other names?",
      "¿Ha usado otros nombres?",
    ),
    yesNo(
      "telecodeNameUsed",
      "Do you have a telecode name?",
      "¿Tiene un nombre en telecode?",
    ),
    field("sex", "select", "Sex", "Sexo", { options: SEX_OPTIONS }),
    field("maritalStatus", "select", "Marital Status", "Estado civil", {
      options: MARITAL_OPTIONS,
    }),
    field("dateOfBirth", "date", "Date of Birth", "Fecha de nacimiento"),
    field("birthCity", "text", "City of Birth", "Ciudad de nacimiento"),
    field(
      "birthState",
      "text",
      "State/Province of Birth",
      "Estado/Provincia de nacimiento",
    ),
    field(
      "birthCountry",
      "text",
      "Country/Region of Birth",
      "País/Región de nacimiento",
    ),
    field(
      "nationality",
      "text",
      "Country/Region of Origin (Nationality)",
      "País/Región de origen (nacionalidad)",
    ),
    yesNo(
      "otherNationality",
      "Do you hold or have you held any nationality other than the one indicated above on nationality?",
      "¿Tiene o ha tenido alguna nacionalidad distinta a la indicada arriba?",
    ),
    yesNo(
      "permanentResidentOther",
      "Are you a permanent resident of a country/region other than your country/region of origin (nationality) above?",
      "¿Es residente permanente de un país/región distinto al de su nacionalidad?",
    ),
    field(
      "nationalId",
      "text",
      "National Identification Number",
      "Número de identificación nacional",
    ),
    dnaText(
      "usSsn",
      "U.S. Social Security Number",
      "Número de Seguro Social de EE. UU.",
    ),
    dnaText(
      "usTin",
      "U.S. Taxpayer ID Number",
      "Número de identificación fiscal de EE. UU.",
    ),
    field("homeStreet", "textarea", "Home Address", "Domicilio"),
  ],
  repeatables: [
    repeatable(
      "otherNames",
      "Other Name",
      "Otro nombre",
      [
        field("otherName", "text", "Other Name Used", "Otro nombre usado"),
      ],
      whenYes("otherNamesUsed"),
    ),
  ],
};

const contact: SectionDef = {
  id: "contact",
  title: {
    en: "Address, Phone, and Email",
    es: "Dirección, teléfono y correo",
  },
  fields: [
    field("homeCity", "text", "City", "Ciudad"),
    field("homeState", "text", "State/Province", "Estado/Provincia"),
    field(
      "homePostal",
      "text",
      "Postal Zone/ZIP Code",
      "Zona postal / código ZIP",
    ),
    field("homeCountry", "text", "Country/Region", "País/Región"),
    yesNo(
      "sameMailingAddress",
      "Is your mailing address the same as your home address?",
      "¿Su dirección postal es la misma que su domicilio?",
    ),
    ...addressFields("mailing", whenNo("sameMailingAddress")),
    field(
      "primaryPhone",
      "phone",
      "Primary Phone Number",
      "Teléfono principal",
    ),
    dnaText(
      "secondaryPhone",
      "Secondary Phone Number",
      "Teléfono secundario",
      "phone",
    ),
    field("workPhone", "phone", "Work Phone Number", "Teléfono del trabajo"),
    yesNo(
      "additionalPhonesYesNo",
      "Do you have any additional phone numbers?",
      "¿Tiene números de teléfono adicionales?",
    ),
    field("email", "email", "Email Address", "Dirección de correo electrónico"),
    yesNo(
      "additionalEmailsYesNo",
      "Do you have any additional email addresses?",
      "¿Tiene alguna dirección de correo electrónico adicional?",
    ),
    yesNo(
      "socialMediaYesNo",
      "Do you have a social media presence?",
      "¿Tiene presencia en redes sociales?",
    ),
  ],
  repeatables: [
    repeatable(
      "additionalPhones",
      "Additional Phone Number",
      "Teléfono adicional",
      [
        field(
          "phone",
          "phone",
          "Additional Phone Number",
          "Número de teléfono adicional",
        ),
      ],
      whenYes("additionalPhonesYesNo"),
    ),
    repeatable(
      "additionalEmails",
      "Additional Email Address",
      "Correo electrónico adicional",
      [
        field(
          "email",
          "email",
          "Additional Email Address",
          "Dirección de correo electrónico adicional",
        ),
      ],
      whenYes("additionalEmailsYesNo"),
    ),
    repeatable(
      "socialMedia",
      "Social Media Presence",
      "Presencia en redes sociales",
      [
        field(
          "platform",
          "select",
          "Social Media Platform",
          "Plataforma de redes sociales",
          { options: SOCIAL_PLATFORM_OPTIONS },
        ),
        field(
          "identifier",
          "text",
          "Social Media Identifier",
          "Identificador de redes sociales",
        ),
      ],
      whenYes("socialMediaYesNo"),
    ),
  ],
};

const passport: SectionDef = {
  id: "passport",
  title: {
    en: "Passport/Travel Document Information",
    es: "Información de pasaporte / documento de viaje",
  },
  fields: [
    field(
      "passportType",
      "select",
      "Passport/Travel Document Type",
      "Tipo de pasaporte / documento de viaje",
      { options: PASSPORT_TYPE_OPTIONS },
    ),
    field(
      "passportNumber",
      "text",
      "Passport/Travel Document Number",
      "Número de pasaporte / documento de viaje",
    ),
    dnaText(
      "passportBookNumber",
      "Passport Book Number",
      "Número de librito de pasaporte",
    ),
    field(
      "passportIssuingCountry",
      "text",
      "Country/Authority that Issued Passport/Travel Document",
      "País/autoridad que expidió el pasaporte / documento de viaje",
    ),
    field(
      "passportIssuedCity",
      "text",
      "City Where Issued",
      "Ciudad de expedición",
    ),
    field(
      "passportIssuedState",
      "text",
      "State/Province Where Issued",
      "Estado/Provincia de expedición",
    ),
    field(
      "passportIssuedCountry",
      "text",
      "Country/Region Where Issued",
      "País/Región de expedición",
    ),
    field("passportIssueDate", "date", "Issuance Date", "Fecha de expedición"),
    field(
      "passportExpiryDate",
      "date",
      "Expiration Date",
      "Fecha de vencimiento",
    ),
    yesNo(
      "lostStolenPassport",
      "Have you ever lost a passport or had one stolen?",
      "¿Ha perdido un pasaporte o se lo han robado?",
    ),
  ],
};

const travel: SectionDef = {
  id: "travel",
  title: {
    en: "Travel Information",
    es: "Información de viaje",
  },
  fields: [
    field(
      "purposeOfTrip",
      "select",
      "Purpose of Trip to the U.S.",
      "Propósito del viaje a EE. UU.",
      { options: PURPOSE_OPTIONS },
    ),
    field("specifyVisaType", "select", "Specify", "Especifique", {
      options: SPECIFY_OPTIONS,
    }),
    yesNo(
      "specificTravelPlans",
      "Have you made specific travel plans?",
      "¿Ha hecho planes de viaje específicos?",
    ),
    field("arrivalDate", "date", "Date of Arrival in U.S.", "Fecha de llegada a EE. UU.", {
      showWhen: whenYes("specificTravelPlans"),
    }),
    field("arrivalFlight", "text", "Arrival Flight", "Vuelo de llegada", {
      showWhen: whenYes("specificTravelPlans"),
    }),
    field("arrivalCity", "text", "Arrival City", "Ciudad de llegada", {
      showWhen: whenYes("specificTravelPlans"),
    }),
    field(
      "departureDate",
      "date",
      "Date of Departure from U.S.",
      "Fecha de salida de EE. UU.",
      { showWhen: whenYes("specificTravelPlans") },
    ),
    field("departureFlight", "text", "Departure Flight", "Vuelo de salida", {
      showWhen: whenYes("specificTravelPlans"),
    }),
    field("departureCity", "text", "Departure City", "Ciudad de salida", {
      showWhen: whenYes("specificTravelPlans"),
    }),
    field(
      "usStayStreet",
      "textarea",
      "Address where you will stay in the U.S.",
      "Dirección donde se hospedará en EE. UU.",
    ),
    field("usStayCity", "text", "City", "Ciudad"),
    field("usStayState", "text", "State", "Estado"),
    field(
      "usStayPostal",
      "text",
      "Postal/Zip Code",
      "Código postal / ZIP",
    ),
    field(
      "personPaying",
      "select",
      "Person/Entity Paying for Your Trip",
      "Persona/entidad que paga su viaje",
      { options: PAYER_OPTIONS },
    ),
    yesNo(
      "travelingWithOthers",
      "Are there other persons traveling with you?",
      "¿Viajan otras personas con usted?",
    ),
    yesNo(
      "travelingAsGroup",
      "Are you traveling as part of a group or organization?",
      "¿Viaja como parte de un grupo u organización?",
    ),
    field("groupName", "text", "Name of the Group", "Nombre del grupo", {
      showWhen: whenYes("travelingAsGroup"),
    }),
  ],
  repeatables: [
    repeatable("visitLocations", "Location to Visit", "Lugar a visitar", [
      field("location", "text", "Location", "Lugar"),
    ]),
  ],
};

const usHistory: SectionDef = {
  id: "usHistory",
  title: {
    en: "Previous U.S. Travel and Visa",
    es: "Viajes y visa previos a EE. UU.",
  },
  fields: [
    yesNo(
      "everInUs",
      "Have you ever been in the U.S.?",
      "¿Ha estado alguna vez en EE. UU.?",
    ),
    yesNo(
      "usDriversLicense",
      "Do you or did you hold a U.S. Driver's License?",
      "¿Tiene o tuvo una licencia de conducir de EE. UU.?",
    ),
    yesNo(
      "everIssuedUsVisa",
      "Have you ever been issued a U.S. Visa?",
      "¿Le han expedido alguna vez una visa de EE. UU.?",
    ),
    field(
      "lastVisaIssuedDate",
      "date",
      "Date Last Visa was Issued",
      "Fecha en que se expidió la última visa",
      { showWhen: whenYes("everIssuedUsVisa") },
    ),
    field("visaNumber", "text", "Visa Number", "Número de visa", {
      showWhen: whenYes("everIssuedUsVisa"),
    }),
    yesNo(
      "sameVisaType",
      "Are you applying for the same type of visa?",
      "¿Solicita el mismo tipo de visa?",
      { showWhen: whenYes("everIssuedUsVisa") },
    ),
    yesNo(
      "sameCountryResidence",
      "Are you applying in the same country where the visa above was issued and is this country your principal country of residence?",
      "¿Solicita en el mismo país donde se expidió la visa anterior y es ese su país principal de residencia?",
      { showWhen: whenYes("everIssuedUsVisa") },
    ),
    yesNo(
      "tenPrinted",
      "Have you been ten-printed?",
      "¿Le han tomado las diez huellas?",
      { showWhen: whenYes("everIssuedUsVisa") },
    ),
    yesNo(
      "visaLostStolen",
      "Has your U.S. Visa ever been lost or stolen?",
      "¿Su visa de EE. UU. se ha perdido o ha sido robada?",
      { showWhen: whenYes("everIssuedUsVisa") },
    ),
    yesNo(
      "visaCancelledRevoked",
      "Has your U.S. Visa ever been cancelled or revoked?",
      "¿Su visa de EE. UU. ha sido cancelada o revocada?",
      { showWhen: whenYes("everIssuedUsVisa") },
    ),
    yesNo(
      "refusedVisaOrAdmission",
      "Have you ever been refused a U.S. Visa, or been refused admission to the United States, or withdrawn your application for admission at the port of entry?",
      "¿Le han negado una visa de EE. UU., le han negado la admisión, o retiró su solicitud de admisión en el puerto de entrada?",
    ),
    yesNo(
      "immigrantPetition",
      "Has anyone ever filed an immigrant petition on your behalf with the United States Citizenship and Immigration Services?",
      "¿Alguien ha presentado alguna vez una petición de inmigrante a su nombre ante USCIS?",
    ),
  ],
  repeatables: [
    repeatable(
      "usTrips",
      "Previous U.S. Visit",
      "Visita previa a EE. UU.",
      [
        field("dateArrived", "date", "Date Arrived", "Fecha de llegada"),
        field(
          "lengthAmount",
          "text",
          "Length of Stay",
          "Duración de la estancia",
        ),
        field("lengthUnit", "select", "Length Unit", "Unidad de duración", {
          options: STAY_UNIT_OPTIONS,
        }),
      ],
      whenYes("everInUs"),
    ),
  ],
};

const usContact: SectionDef = {
  id: "usContact",
  title: {
    en: "U.S. Contact Information",
    es: "Información de contacto en EE. UU.",
  },
  fields: [
    field(
      "usContactName",
      "text",
      "Contact Person Name in the U.S.",
      "Nombre de la persona de contacto en EE. UU.",
    ),
    field(
      "usContactOrg",
      "text",
      "Organization Name in the U.S.",
      "Nombre de la organización en EE. UU.",
    ),
    field(
      "usContactRelationship",
      "text",
      "Relationship to You",
      "Parentesco o relación con usted",
    ),
    field(
      "usContactAddress",
      "textarea",
      "U.S. Contact Address",
      "Dirección de contacto en EE. UU.",
    ),
    field("usContactPhone", "phone", "Phone Number", "Número de teléfono"),
    field(
      "usContactEmail",
      "email",
      "Email Address",
      "Dirección de correo electrónico",
    ),
  ],
};

const family: SectionDef = {
  id: "family",
  title: {
    en: "Family Information",
    es: "Información familiar",
  },
  fields: [
    field("fatherSurnames", "text", "Father's Surnames", "Apellidos del padre"),
    field(
      "fatherGivenNames",
      "text",
      "Father's Given Names",
      "Nombres de pila del padre",
    ),
    field(
      "fatherDob",
      "date",
      "Father's Date of Birth",
      "Fecha de nacimiento del padre",
    ),
    yesNo(
      "fatherInUs",
      "Is your father in the U.S.?",
      "¿Su padre está en EE. UU.?",
    ),
    field("motherSurnames", "text", "Mother's Surnames", "Apellidos de la madre"),
    field(
      "motherGivenNames",
      "text",
      "Mother's Given Names",
      "Nombres de pila de la madre",
    ),
    field(
      "motherDob",
      "date",
      "Mother's Date of Birth",
      "Fecha de nacimiento de la madre",
    ),
    yesNo(
      "motherInUs",
      "Is your mother in the U.S.?",
      "¿Su madre está en EE. UU.?",
    ),
    yesNo(
      "immediateRelativesInUs",
      "Do you have any immediate relatives, not including parents, in the U.S.?",
      "¿Tiene familiares inmediatos, sin incluir a los padres, en EE. UU.?",
    ),
    yesNo(
      "otherRelativesInUs",
      "Do you have any other relatives in the United States?",
      "¿Tiene otros parientes en los Estados Unidos?",
    ),
    field(
      "spouseFullName",
      "text",
      "Spouse's Full Name",
      "Nombre completo del cónyuge",
    ),
    field(
      "spouseDob",
      "date",
      "Spouse's Date of Birth",
      "Fecha de nacimiento del cónyuge",
    ),
    field(
      "spouseNationality",
      "text",
      "Spouse's Country/Region of Origin (Nationality)",
      "País/Región de origen (nacionalidad) del cónyuge",
    ),
    field(
      "spouseCityOfBirth",
      "text",
      "Spouse's City of Birth",
      "Ciudad de nacimiento del cónyuge",
    ),
    field(
      "spouseCountryOfBirth",
      "text",
      "Spouse's Country/Region of Birth",
      "País/Región de nacimiento del cónyuge",
    ),
    field("spouseAddress", "textarea", "Spouse's Address", "Dirección del cónyuge", {
      doesNotApply: true,
      doesNotApplyLabel: {
        en: "SAME AS HOME ADDRESS",
        es: "LA MISMA QUE EL DOMICILIO",
      },
      doesNotApplyValue: "SAME AS HOME ADDRESS",
    }),
  ],
};

const workNow: SectionDef = {
  id: "workNow",
  title: {
    en: "Present Work/Education/Training",
    es: "Trabajo / estudios / capacitación actuales",
  },
  fields: [
    field(
      "primaryOccupation",
      "text",
      "Primary Occupation",
      "Ocupación principal",
    ),
    field(
      "presentEmployer",
      "text",
      "Present Employer or School Name",
      "Nombre del empleador o escuela actual",
    ),
    ...addressFields("workNow"),
    field(
      "presentWorkPhone",
      "phone",
      "Work Phone Number",
      "Teléfono del trabajo",
    ),
    field(
      "monthlySalary",
      "text",
      "Monthly Salary in Local Currency (if employed)",
      "Salario mensual en moneda local (si está empleado)",
    ),
    field(
      "presentDuties",
      "textarea",
      "Briefly Describe your Duties",
      "Describa brevemente sus funciones",
    ),
  ],
};

const workPast: SectionDef = {
  id: "workPast",
  title: {
    en: "Previous Employment",
    es: "Empleo anterior",
  },
  fields: [
    yesNo(
      "previouslyEmployed",
      "Were you previously employed?",
      "¿Estuvo empleado anteriormente?",
    ),
  ],
  repeatables: [
    repeatable(
      "employers",
      "Previous Employer",
      "Empleador anterior",
      [
        field("employerName", "text", "Employer Name", "Nombre del empleador"),
        field(
          "employerAddress",
          "textarea",
          "Employer Address",
          "Dirección del empleador",
        ),
        field("city", "text", "City", "Ciudad"),
        field("state", "text", "State/Province", "Estado/Provincia"),
        field(
          "postal",
          "text",
          "Postal Zone/Zip Code",
          "Zona postal / código ZIP",
        ),
        field("country", "text", "Country/Region", "País/Región"),
        field("telephone", "phone", "Telephone Number", "Número de teléfono"),
        field("jobTitle", "text", "Job Title", "Puesto"),
        field(
          "supervisorSurname",
          "text",
          "Supervisor's Surname",
          "Apellido del supervisor",
        ),
        field(
          "supervisorGiven",
          "text",
          "Supervisor's Given Name",
          "Nombre de pila del supervisor",
        ),
        field(
          "dateFrom",
          "date",
          "Employment Date From",
          "Fecha de empleo desde",
        ),
        field("dateTo", "date", "Employment Date To", "Fecha de empleo hasta"),
        field(
          "duties",
          "textarea",
          "Briefly describe your duties",
          "Describa brevemente sus funciones",
        ),
      ],
      whenYes("previouslyEmployed"),
    ),
  ],
};

const education: SectionDef = {
  id: "education",
  title: {
    en: "Education",
    es: "Educación",
  },
  fields: [
    yesNo(
      "attendedEducation",
      "Have you attended any educational institutions at a secondary level or above?",
      "¿Ha asistido a instituciones educativas de nivel secundario o superior?",
    ),
  ],
  repeatables: [
    repeatable(
      "institutions",
      "Educational Institution",
      "Institución educativa",
      [
        field(
          "institutionName",
          "text",
          "Name of Institution",
          "Nombre de la institución",
        ),
        field(
          "address",
          "textarea",
          "Address of Institution",
          "Dirección de la institución",
        ),
        field("city", "text", "City", "Ciudad"),
        field("state", "text", "State/Province", "Estado/Provincia"),
        field(
          "postal",
          "text",
          "Postal Zone/ZIP Code",
          "Zona postal / código ZIP",
        ),
        field("country", "text", "Country/Region", "País/Región"),
        field("courseOfStudy", "text", "Course of Study", "Curso de estudios"),
        field(
          "dateFrom",
          "date",
          "Date of Attendance From",
          "Fecha de asistencia desde",
        ),
        field(
          "dateTo",
          "date",
          "Date of Attendance To",
          "Fecha de asistencia hasta",
        ),
      ],
      whenYes("attendedEducation"),
    ),
  ],
};

const languagesTravel: SectionDef = {
  id: "languagesTravel",
  title: {
    en: "Languages and Additional Background",
    es: "Idiomas y antecedentes adicionales",
  },
  fields: [
    yesNo(
      "traveledLastFiveYears",
      "Have you traveled to any countries/regions within the last five years?",
      "¿Ha viajado a algún país/región en los últimos cinco años?",
    ),
    yesNo(
      "clanOrTribe",
      "Do you belong to a clan or tribe?",
      "¿Pertenece a un clan o tribu?",
    ),
    yesNo(
      "organizations",
      "Have you belonged to, contributed to, or worked for any professional, social, or charitable organization?",
      "¿Ha pertenecido, contribuido o trabajado para alguna organización profesional, social o benéfica?",
    ),
    yesNo(
      "specializedSkills",
      "Do you have any specialized skills or training, such as firearms, explosives, nuclear, biological, or chemical experience?",
      "¿Tiene habilidades o capacitación especializadas, como experiencia con armas de fuego, explosivos, material nuclear, biológico o químico?",
    ),
    yesNo(
      "militaryService",
      "Have you ever served in the military?",
      "¿Ha servido alguna vez en las fuerzas armadas?",
    ),
  ],
  repeatables: [
    repeatable("languages", "Language", "Idioma", [
      field("languageName", "text", "Language Name", "Nombre del idioma"),
    ]),
    repeatable(
      "countriesVisited",
      "Country/Region Visited",
      "País/Región visitado",
      [
        field(
          "country",
          "text",
          "Country/Region",
          "País/Región",
        ),
      ],
      whenYes("traveledLastFiveYears"),
    ),
  ],
};

const securityQuestions: Array<[string, string, string]> = [
  [
    "paramilitary",
    "Have you ever served in, been a member of, or been involved with a paramilitary unit, vigilante unit, rebel group, guerrilla group, or insurgent organization?",
    "¿Ha servido, sido miembro o estado involucrado con una unidad paramilitar, grupo de vigilantes, grupo rebelde, guerrilla u organización insurgente?",
  ],
  [
    "communicableDisease",
    "Do you have a communicable disease of public health significance? (Communicable diseases of public health significance include chancroid, gonorrhea, granuloma inguinale, infectious leprosy, lymphogranuloma venereum, infectious stage syphilis, active tuberculosis, and others diseases as determined by the Department of Health and Human Services.)",
    "¿Tiene una enfermedad transmisible de importancia para la salud pública? (Incluyen chancroide, gonorrea, granuloma inguinal, lepra infecciosa, linfogranuloma venéreo, sífilis en etapa infecciosa, tuberculosis activa y otras determinadas por el Department of Health and Human Services.)",
  ],
  [
    "mentalPhysicalDisorder",
    "Do you have a mental or physical disorder that poses or is likely to pose a threat to the safety or welfare of yourself or others?",
    "¿Tiene un trastorno mental o físico que representa o es probable que represente una amenaza para su seguridad o la de otros?",
  ],
  [
    "drugAbuser",
    "Are you or have you ever been a drug abuser or addict?",
    "¿Es o ha sido consumidor abusivo o adicto a las drogas?",
  ],
  [
    "arrestedConvicted",
    "Have you ever been arrested or convicted for any offense or crime, even though subject of a pardon, amnesty, or other similar action?",
    "¿Ha sido arrestado o condenado por algún delito, aunque haya recibido indulto, amnistía u otra acción similar?",
  ],
  [
    "controlledSubstances",
    "Have you ever violated, or engaged in a conspiracy to violate, any law relating to controlled substances?",
    "¿Ha violado, o conspirado para violar, alguna ley relativa a sustancias controladas?",
  ],
  [
    "prostitution",
    "Are you coming to the United States to engage in prostitution or unlawful commercialized vice or have you been engaged in prostitution or procuring prostitutes within the past 10 years?",
    "¿Viene a los Estados Unidos para ejercer la prostitución o vicio comercial ilegal, o ha ejercido la prostitución o el proxenetismo en los últimos 10 años?",
  ],
  [
    "moneyLaundering",
    "Have you ever been involved in, or do you seek to engage in, money laundering?",
    "¿Ha participado o pretende participar en el lavado de dinero?",
  ],
  [
    "humanTrafficking",
    "Have you ever committed or conspired to commit a human trafficking offense in the United States or outside the United States?",
    "¿Ha cometido o conspirado para cometer un delito de trata de personas en los Estados Unidos o fuera de ellos?",
  ],
  [
    "traffickingFamily",
    "Are you the spouse, son, or daughter of an individual who has committed or conspired to commit a human trafficking offense in the United States or outside the United States and have you within the last five years, knowingly benefited from the trafficking activities?",
    "¿Es cónyuge, hijo o hija de alguien que ha cometido o conspirado para cometer trata de personas, y en los últimos cinco años se benefició a sabiendas de esas actividades?",
  ],
  [
    "traffickingAid",
    "Have you knowingly aided, abetted, assisted or colluded with an individual who has committed or conspired to commit a severe human trafficking offense in the United States or outside the United States?",
    "¿Ha ayudado, instigado, asistido o coludido a sabiendas con alguien que ha cometido o conspirado para cometer trata de personas grave?",
  ],
  [
    "espionage",
    "Do you seek to engage in espionage, sabotage, export control violations, or any other illegal activity while in the United States?",
    "¿Pretende participar en espionaje, sabotaje, violaciones de control de exportaciones u otra actividad ilegal mientras esté en los Estados Unidos?",
  ],
  [
    "terroristActivity",
    "Do you seek to engage in terrorist activities while in the United States or have you ever engaged in terrorist activities?",
    "¿Pretende participar en actividades terroristas en los Estados Unidos o ha participado alguna vez en ellas?",
  ],
  [
    "terroristSupport",
    "Have you ever or do you intend to provide financial assistance or other support to terrorists or terrorist organizations?",
    "¿Ha proporcionado o pretende proporcionar asistencia financiera u otro apoyo a terroristas u organizaciones terroristas?",
  ],
  [
    "terroristMember",
    "Are you a member or representative of a terrorist organization?",
    "¿Es miembro o representante de una organización terrorista?",
  ],
  [
    "terroristFamily",
    "Are you the spouse, son, or daughter of an individual who has engaged in terrorist activity, including providing financial assistance or other support to terrorists or terrorist organizations, in the last five years?",
    "¿Es cónyuge, hijo o hija de alguien que ha participado en actividad terrorista, incluido apoyo financiero, en los últimos cinco años?",
  ],
  [
    "genocide",
    "Have you ever ordered, incited, committed, assisted, or otherwise participated in genocide?",
    "¿Ha ordenado, instigado, cometido, asistido o participado de otro modo en genocidio?",
  ],
  [
    "torture",
    "Have you ever committed, ordered, incited, assisted, or otherwise participated in torture?",
    "¿Ha cometido, ordenado, instigado, asistido o participado de otro modo en tortura?",
  ],
  [
    "extrajudicialKillings",
    "Have you committed, ordered, incited, assisted, or otherwise participated in extrajudicial killings, political killings, or other acts of violence?",
    "¿Ha cometido, ordenado, instigado, asistido o participado en ejecuciones extrajudiciales, asesinatos políticos u otros actos de violencia?",
  ],
  [
    "childSoldiers",
    "Have you ever engaged in the recruitment or the use of the child soldiers?",
    "¿Ha participado en el reclutamiento o el uso de niños soldados?",
  ],
  [
    "religiousFreedom",
    "Have you, while serving as a government official, been responsible for or directly carried out, at any time, particularly severe violations of religious freedom?",
    "¿Como funcionario de gobierno, ha sido responsable o ha cometido violaciones particularmente graves de la libertad religiosa?",
  ],
  [
    "forcedAbortion",
    "Have you ever been directly involved in the establishment or enforcement of the population controls forcing a woman to undergo an abortion against her free choice or a man or a woman to undergo sterilization against his or her free will?",
    "¿Ha participado directamente en controles de población que obligan a un aborto o a una esterilización contra la voluntad de la persona?",
  ],
  [
    "organTransplant",
    "Have you ever been directly involved in the coercive transplantation of human organs or bodily tissue?",
    "¿Ha participado directamente en el trasplante coercitivo de órganos o tejidos humanos?",
  ],
  [
    "removalHearing",
    "Have you ever been the subject of a removal or deportation hearing?",
    "¿Ha sido objeto de una audiencia de expulsión o deportación?",
  ],
  [
    "immigrationFraud",
    "Have you ever sought to obtain or assist others to obtain a visa, entry into the United States, or any other United States immigration benefit by fraud or willful misrepresentation or other unlawful means?",
    "¿Ha buscado obtener o ayudar a otros a obtener una visa, entrada u otro beneficio migratorio de EE. UU. mediante fraude, tergiversación intencional u otros medios ilícitos?",
  ],
  [
    "failedHearing",
    "Have you failed to attend a hearing on removability or inadmissibility within the last five years?",
    "¿Ha faltado a una audiencia de expulsión o inadmisibilidad en los últimos cinco años?",
  ],
  [
    "unlawfulPresence",
    "Have you ever been unlawfully present, overstayed the amount of time granted by an immigration official or otherwise violated the terms of a U.S. visa?",
    "¿Ha estado presente de forma ilegal, se ha quedado más tiempo del autorizado o ha violado los términos de una visa de EE. UU.?",
  ],
  [
    "deportedAnyCountry",
    "Have you ever been removed or deported from any country?",
    "¿Ha sido expulsado o deportado de algún país?",
  ],
  [
    "withheldCustody",
    "Have you ever withheld custody of a U.S. citizen child outside the United States from a person granted legal custody by a U.S. court?",
    "¿Ha retenido la custodia de un niño ciudadano de EE. UU. fuera de los Estados Unidos a una persona a quien un tribunal de EE. UU. otorgó la custodia legal?",
  ],
  [
    "votedUnlawfully",
    "Have you voted in the United States in violation of any law or regulation?",
    "¿Ha votado en los Estados Unidos en violación de alguna ley o reglamento?",
  ],
  [
    "renouncedForTax",
    "Have you ever renounced United States citizenship for the purpose of avoiding taxation?",
    "¿Ha renunciado a la ciudadanía de EE. UU. con el fin de evadir impuestos?",
  ],
  [
    "publicSchoolFStatus",
    "Have you attended a public elementary school on student (F) status or a public secondary school after November 30, 1996 without reimbursing the school?",
    "¿Ha asistido a una escuela primaria pública con estatus de estudiante (F) o a una escuela secundaria pública después del 30 de noviembre de 1996 sin reembolsar a la escuela?",
  ],
];

const security: SectionDef = {
  id: "security",
  title: {
    en: "Security and Background Information",
    es: "Información de seguridad y antecedentes",
  },
  fields: securityQuestions.map(([id, en, es]) => {
    return yesNo(id, en, es);
  }),
};

const locationPreparer: SectionDef = {
  id: "locationPreparer",
  title: {
    en: "Location and Preparer",
    es: "Ubicación y preparador",
  },
  fields: [
    field(
      "currentLocation",
      "text",
      "Current Location (location where you will be submitting your application)",
      "Ubicación actual (lugar donde presentará su solicitud)",
    ),
    yesNo(
      "preparerAssisted",
      "Did anyone assist you in filling out this application?",
      "¿Alguien le ayudó a llenar esta solicitud?",
    ),
  ],
};

export const SECTIONS: readonly SectionDef[] = [
  personal,
  contact,
  passport,
  travel,
  usHistory,
  usContact,
  family,
  workNow,
  workPast,
  education,
  languagesTravel,
  security,
  locationPreparer,
];
