export const LANGUAGES = [
  { value: "de", labelBR: "🇩🇪 Alemão", labelEN: "🇩🇪 German" },
  { value: "ar", labelBR: "🇸🇦 Árabe", labelEN: "🇸🇦 Arabic" },
  { value: "bg", labelBR: "🇧🇬 Búlgaro", labelEN: "🇧🇬 Bulgarian" },
  { value: "cn", labelBR: "🇨🇳 Chinês", labelEN: "🇨🇳 Chinese" },
  { value: "ko", labelBR: "🇰🇷 Coreano", labelEN: "🇰🇷 Korean" },
  { value: "hr", labelBR: "🇭🇷 Croata", labelEN: "🇭🇷 Croatian" },
  { value: "dk", labelBR: "🇩🇰 Dinamarquês", labelEN: "🇩🇰 Danish" },
  { value: "sk", labelBR: "🇸🇰 Eslovaco", labelEN: "🇸🇰 Slovak" },
  { value: "sl", labelBR: "🇸🇮 Esloveno", labelEN: "🇸🇮 Slovenian" },
  { value: "es", labelBR: "🇪🇸 Espanhol", labelEN: "🇪🇸 Spanish" },
  {
    value: "esAR",
    labelBR: "🇦🇷 Espanhol Argentino",
    labelEN: "🇦🇷 Argentine Spanish",
  },
  {
    value: "esCT",
    labelBR: "🇪🇸 Espanhol Catalão",
    labelEN: "🇪🇸 Catalan Spanish",
  },
  {
    value: "exMX",
    labelBR: "🇲🇽 Espanhol Mexicano",
    labelEN: "🇲🇽 Mexican Spanish",
  },
  { value: "et", labelBR: "🇪🇪 Estoniano", labelEN: "🇪🇪 Estonian" },
  { value: "fi", labelBR: "🇫🇮 Finlandês", labelEN: "🇫🇮 Finnish" },
  { value: "fr", labelBR: "🇫🇷 Francês", labelEN: "🇫🇷 French" },
  { value: "gr", labelBR: "🇬🇷 Grego", labelEN: "🇬🇷 Greek" },
  { value: "he", labelBR: "🇮🇱 Hebraico", labelEN: "🇮🇱 Hebrew" },
  { value: "nl", labelBR: "🇳🇱 Holandês", labelEN: "🇳🇱 Dutch" },
  { value: "hu", labelBR: "🇭🇺 Húngaro", labelEN: "🇭🇺 Hungarian" },
  { value: "id", labelBR: "🇮🇩 Indonésio", labelEN: "🇮🇩 Indonesian" },
  { value: "en", labelBR: "🇺🇸 Inglês", labelEN: "🇺🇸 English" },
  { value: "it", labelBR: "🇮🇹 Italiano", labelEN: "🇮🇹 Italian" },
  { value: "jp", labelBR: "🇯🇵 Japonês", labelEN: "🇯🇵 Japanese" },
  { value: "lv", labelBR: "🇱🇻 Letão", labelEN: "🇱🇻 Latvian" },
  { value: "lt", labelBR: "🇱🇹 Lituano", labelEN: "🇱🇹 Lithuanian" },
  { value: "no", labelBR: "🇳🇴 Norueguês", labelEN: "🇳🇴 Norwegian" },
  { value: "pl", labelBR: "🇵🇱 Polonês", labelEN: "🇵🇱 Polish" },
  {
    value: "br",
    labelBR: "🇧🇷 Português (Brasil)",
    labelEN: "🇧🇷 Portuguese (Brazil)",
  },
  {
    value: "pt",
    labelBR: "🇵🇹 Português (Portugal)",
    labelEN: "🇵🇹 Portuguese (Portugal)",
  },
  { value: "ro", labelBR: "🇷🇴 Romeno", labelEN: "🇷🇴 Romanian" },
  { value: "ru", labelBR: "🇷🇺 Russo", labelEN: "🇷🇺 Russian" },
  { value: "sr", labelBR: "🇷🇸 Sérvio", labelEN: "🇷🇸 Serbian" },
  { value: "sv", labelBR: "🇸🇪 Sueco", labelEN: "🇸🇪 Swedish" },
  { value: "th", labelBR: "🇹🇭 Tailandês", labelEN: "🇹🇭 Thai" },
  { value: "cz", labelBR: "🇨🇿 Tcheco", labelEN: "🇨🇿 Czech" },
  { value: "tr", labelBR: "🇹🇷 Turco", labelEN: "🇹🇷 Turkish" },
  { value: "ukr", labelBR: "🇺🇦 Ucraniano", labelEN: "🇺🇦 Ukrainian" },
  { value: "vn", labelBR: "🇻🇳 Vietnamita", labelEN: "🇻🇳 Vietnamese" },
];

export const getTooltips = (appLang: "EN" | "BR") => ({
  tenant:
    appLang === "EN"
      ? "Unique tenant identifier for your store."
      : "Tenant unico da sua loja.",
  buttonsAnchor:
    appLang === "EN"
      ? "CSS selector defining where the buttons will be injected on the page."
      : "Seletor CSS definindo onde os botões serão injetados na página.",
  defaultPermalink:
    appLang === "EN"
      ? "Enable if you want to use the default permalink structure. Disable to set custom domain/id."
      : "Ative se quiser usar a estrutura padrão de permalink. Desative para configurar domínio/id.",
  stockBreak:
    appLang === "EN"
      ? "Triggers specific actions when a product size is out of stock."
      : "Aciona ações específicas quando um tamanho de produto está sem estoque.",
  imagePDP:
    appLang === "EN"
      ? "Selector for the main product image on the Product Details Page."
      : "Seletor para a imagem principal do produto na página de detalhes.",
  addToCart:
    appLang === "EN"
      ? "CSS selector for the main 'Add to Cart' or 'Buy' button."
      : "Seletor CSS do botão principal de 'Adicionar ao Carrinho' ou 'Comprar'.",
  onPage:
    appLang === "EN"
      ? "Enables on-page specific features like inline size selection."
      : "Ativa funcionalidades específicas na página, como seleção de tamanho em linha.",
  brands:
    appLang === "EN"
      ? "Enables the comparison logic between different shoe brands."
      : "Ativa a lógica de comparação entre diferentes marcas de calçados.",
  storeName:
    appLang === "EN"
      ? "The display name of the store."
      : "Nome de exibição da loja.",
  gender:
    appLang === "EN"
      ? "The primary gender of the store's catalogue."
      : "Gênero principal do catálogo da loja.",
  customLang:
    appLang === "EN"
      ? "Enable if you want to use customized language translations in JSON."
      : "Ative se quiser usar traduções de idioma customizadas no JSON.",
  units:
    appLang === "EN"
      ? "Switch between Centimeters (CM) and Inches (IN)."
      : "Alterne entre Centímetros (CM) e Polegadas (IN).",
  measSwitcher:
    appLang === "EN"
      ? "Show a toggle for users to switch measurement units themselves."
      : "Mostra um botão para os usuários alternarem as unidades de medida.",
  skinTones:
    appLang === "EN"
      ? "Enable selection of different skin tones in the avatar."
      : "Ativa a seleção de diferentes tons de pele no avatar.",
  filterChart:
    appLang === "EN"
      ? "Filter the measurement chart based on the type of clothes."
      : "Filtra a tabela de medidas com base no tipo de roupa.",
  bodyAdj:
    appLang === "EN"
      ? "Enable the body adjustment step for users."
      : "Ativa a etapa de ajuste corporal para os usuários.",
  calc:
    appLang === "EN"
      ? "Show the 'Calculating...' loading screen step."
      : "Mostra a tela de carregamento 'Calculando...'.",
});
