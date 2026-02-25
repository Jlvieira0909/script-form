"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import "./main.css";

const LANGUAGES = [
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

type TooltipProps = { text?: string };
type TextInputProps = {
  title: string;
  placeholder?: string;
  tooltip?: string;
  value: string;
  onChange: (v: string) => void;
};
type ToggleBlockProps = {
  title: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  tooltip?: string;
  children?: ReactNode;
};
type LanguageSelectorProps = {
  selectedLangs: string[];
  onToggleLang: (v: string) => void;
  appLang: "EN" | "BR";
};
type TranslationManagerProps = {
  selectedLangs: string[];
  translations: any;
  onChange: (l: string, f: string, v: string) => void;
  appLang: "EN" | "BR";
};

const Tooltip = ({ text }: TooltipProps) => {
  if (!text) return null;
  return (
    <div className="TooltipContainer">
      <span className="TooltipIcon" onClick={(e) => e.preventDefault()}>
        ?
      </span>
      <div className="TooltipText">{text}</div>
    </div>
  );
};

const TextInput = ({
  title,
  placeholder,
  tooltip,
  value,
  onChange,
}: TextInputProps) => (
  <div className="MainFormTextInput">
    <div className="TitleWrapper">
      <h1 className="MainFormTextInputTitle">{title}</h1>
      <Tooltip text={tooltip} />
    </div>
    <input
      className="MainFormTextInputInput"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const ToggleBlock = ({
  title,
  checked,
  onChange,
  tooltip,
  children,
}: ToggleBlockProps) => (
  <div className="MainFormToggleInput">
    <label className="MainFormToggleInputToggle">
      <input
        type="checkbox"
        className="toggle-input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="TitleWrapper">
        <h1 className="MainFormTextInputTitle">{title}</h1>
        <Tooltip text={tooltip} />
      </div>
    </label>
    {children}
  </div>
);

const LanguageSelector = ({
  selectedLangs,
  onToggleLang,
  appLang,
}: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="MainFormTextInput">
      <h1 className="MainFormTextInputTitle">
        {appLang === "EN" ? "Languages" : "Idiomas"}
      </h1>
      <div className="CustomSelectContainer" ref={selectRef}>
        <div className="CustomSelectTrigger" onClick={() => setIsOpen(!isOpen)}>
          {selectedLangs.length === 0
            ? appLang === "EN"
              ? "Select languages"
              : "Selecione os idiomas"
            : `${selectedLangs.length} ${appLang === "EN" ? "selected" : "selecionados"}`}
        </div>
        {isOpen && (
          <div className="CustomSelectMenu">
            {LANGUAGES.map((lang) => {
              const label = appLang === "EN" ? lang.labelEN : lang.labelBR;
              return (
                <div
                  key={lang.value}
                  className={`CustomSelectOption ${selectedLangs.includes(lang.value) ? "selected" : ""}`}
                  onClick={() => onToggleLang(lang.value)}
                >
                  <input
                    type="checkbox"
                    checked={selectedLangs.includes(lang.value)}
                    readOnly
                    className="CustomSelectCheckbox"
                  />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedLangs.length > 0 && (
        <div className="SelectedTagsContainer">
          {selectedLangs.map((val) => {
            const langObj = LANGUAGES.find((l) => l.value === val);
            const label = langObj
              ? appLang === "EN"
                ? langObj.labelEN
                : langObj.labelBR
              : "";
            const flag = label ? label.split(" ")[0] : "";
            return (
              <div
                key={val}
                className="SelectedTag"
                onClick={() => onToggleLang(val)}
              >
                <span>{flag}</span>
                <span>{val.toUpperCase()}</span>
                <span className="SelectedTagRemove">×</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const TranslationManager = ({
  selectedLangs,
  translations,
  onChange,
  appLang,
}: TranslationManagerProps) => {
  if (selectedLangs.length === 0) return null;
  return (
    <div className="TranslationsContainer">
      {selectedLangs.map((val) => {
        const langObj = LANGUAGES.find((l) => l.value === val);
        const label = langObj
          ? appLang === "EN"
            ? langObj.labelEN
            : langObj.labelBR
          : val.toUpperCase();
        return (
          <div key={`trans-${val}`} className="TranslationCard">
            <h2 className="TranslationCardTitle">{label}</h2>
            <div className="TranslationInputGroup">
              <label>
                {appLang === "EN"
                  ? "Virtual Fitting Room Button"
                  : "Botão do Provador Virtual"}
              </label>
              <input
                className="MainFormTextInputInput"
                type="text"
                value={translations[val]?.btnVirtual || ""}
                onChange={(e) => onChange(val, "btnVirtual", e.target.value)}
              />
            </div>
            <div className="TranslationInputGroup">
              <label>
                {appLang === "EN"
                  ? "Size Chart Button"
                  : "Botão da Tabela de Medidas"}
              </label>
              <input
                className="MainFormTextInputInput"
                type="text"
                value={translations[val]?.btnSize || ""}
                onChange={(e) => onChange(val, "btnSize", e.target.value)}
              />
            </div>
            <div className="TranslationInputGroup">
              <label>
                {appLang === "EN"
                  ? "Recommendation Text"
                  : "Texto de Recomendação"}
              </label>
              <input
                className="MainFormTextInputInput"
                type="text"
                value={translations[val]?.txtRec || ""}
                onChange={(e) => onChange(val, "txtRec", e.target.value)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function Home() {
  const [appLang, setAppLang] = useState<"EN" | "BR">("EN");
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [translations, setTranslations] = useState<{
    [key: string]: { btnVirtual: string; btnSize: string; txtRec: string };
  }>({});

  const [tenantId, setTenantId] = useState("");
  const [buttonsAnchor, setButtonsAnchor] = useState("");
  const [storeDomain, setStoreDomain] = useState("");
  const [permalinkSelector, setPermalinkSelector] = useState("");
  const [stockBreakSelector, setStockBreakSelector] = useState("");
  const [imagePDPSelector, setImagePDPSelector] = useState("");
  const [addToCartSelector, setAddToCartSelector] = useState("");
  const [onPageSelector, setOnPageSelector] = useState("");

  const [isDefaultPermalink, setIsDefaultPermalink] = useState(true);
  const [isQuebraEstoque, setIsQuebraEstoque] = useState(false);
  const [isImagemPDP, setIsImagemPDP] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [isOnPage, setIsOnPage] = useState(false);
  const [isComparacao, setIsComparacao] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleToggleLang = (val: string) => {
    setSelectedLangs((prev) =>
      prev.includes(val) ? prev.filter((l) => l !== val) : [...prev, val],
    );
  };

  const handleTranslationChange = (
    lang: string,
    field: string,
    value: string,
  ) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...(prev[lang] || { btnVirtual: "", btnSize: "", txtRec: "" }),
        [field]: value,
      },
    }));
  };

  const generateScript = () => {
    const tenant = tenantId || "xxxx";
    const anchor = buttonsAnchor || "#sizebay-container";

    let permalinkFunc = `\n  getPermalink() {\n    return window.location.href\n  },`;
    if (!isDefaultPermalink && storeDomain && permalinkSelector) {
      permalinkFunc = `\n  getPermalink() {\n    return 'https://${storeDomain}/' + document.querySelector('${permalinkSelector}')?.textContent.trim()\n  },`;
    }

    let langTextsObj: any = {
      br: {
        buttons: { vfr: "Provador Virtual", measurements: "Tabela de Medidas" },
        recommendation: {
          default: "Recomendamos {size} para {profileName}",
          simplified: "Recomendamos o tamanho {size} para <b>Você</b>",
        },
      },
    };

    if (selectedLangs.length > 0) {
      langTextsObj = {};
      selectedLangs.forEach((lang) => {
        langTextsObj[lang] = {
          buttons: {
            vfr: translations[lang]?.btnVirtual || "Provador Virtual",
            measurements: translations[lang]?.btnSize || "Tabela de Medidas",
          },
          recommendation: {
            default:
              translations[lang]?.txtRec ||
              "Recomendamos {size} para {profileName}",
            simplified:
              translations[lang]?.txtRec ||
              "Recomendamos o tamanho {size} para <b>Você</b>",
          },
        };
      });
    }

    const langTextsString = `const LanguagesTexts = ${JSON.stringify(langTextsObj, null, 2).replace(/"([^(")"]+)":/g, "$1:")}`;

    let additionalMethods = "";

    if (isOnPage && onPageSelector) {
      additionalMethods += `\n  getProductSizes() {\n    return [...document.querySelectorAll('${onPageSelector}')].map((size) => size.textContent)\n  },`;
    } else {
      additionalMethods += `\n  getProductSizes() {\n    return [...document.querySelectorAll('.sizes')].map((size) => size.textContent)\n  },`;
    }

    if (isQuebraEstoque && stockBreakSelector) {
      additionalMethods += `\n  getSizesInStock() {\n    return [...document.querySelectorAll('${stockBreakSelector}:not(.disabled)')].map((size) => size.textContent)\n  },`;
    } else {
      additionalMethods += `\n  getSizesInStock() {\n    return [...document.querySelectorAll('.size:not(.disabled)')].map((size) => size.textContent)\n  },`;
    }

    if (isImagemPDP && imagePDPSelector) {
      additionalMethods += `\n  getPageProductImg() {\n    return document.querySelector('${imagePDPSelector}')?.src || null\n  },`;
    }

    let hasOnPage = `\n  hasOnPageIntegration() {\n    return false\n  },`;
    if (isOnPage) {
      hasOnPage = `\n  hasOnPageIntegration() {\n    return true\n  },`;
    }

    let brandsComp = `\n  getBrandsComparison() {\n    return false\n  },`;
    if (isComparacao) {
      brandsComp = `\n  getBrandsComparison() {\n    return true\n  },`;
    }

    let addToCartCode = `  const payload = { products: [] }
  payload.products.push({ permalink: window?.SizebayPrescript().getPermalink() })
  window.Sizebay.events.addToCart(payload, TENANT_ID)`;

    let initAddToCart = ``;
    if (isAddToCart && addToCartSelector) {
      initAddToCart = `\n  document.querySelector('${addToCartSelector}')?.addEventListener('click', addToCart)\n`;
    }

    return `const TENANT_ID = ${tenant}
const STATIC_URL = 'https://static.sizebay.technology/'
const MODULE_URL = 'https://vfr-v3-production.sizebay.technology/V4/implantation/index.js'
const LANG = document.querySelector('html')?.lang?.split('-').pop().toLocaleLowerCase() || '${selectedLangs[0] || "br"}'

${langTextsString}

window.SizebayPrescript = () => ({${permalinkFunc}
  getAnchor() {
    return {
      web: '${anchor}',
      mobile: '${anchor}',
    }
  },
  getTenantId() {
    return TENANT_ID
  },
  getLanguage() {
    return LANG
  },
  getButtons() {
    return {
      order: [
        { name: 'vfr', text: LanguagesTexts[LANG]?.buttons?.vfr || LanguagesTexts['${selectedLangs[0] || "br"}'].buttons.vfr },
        { name: 'measurements', text: LanguagesTexts[LANG]?.buttons?.measurements || LanguagesTexts['${selectedLangs[0] || "br"}'].buttons.measurements },
      ],
      position: 'after',
      class: 'vfr__button--clean',
    }
  },
  getRecommendationText() {
    return {
      default: LanguagesTexts[LANG]?.recommendation?.default || LanguagesTexts['${selectedLangs[0] || "br"}'].recommendation.default,
      simplified: LanguagesTexts[LANG]?.recommendation?.simplified || LanguagesTexts['${selectedLangs[0] || "br"}'].recommendation.simplified,
      order: 'before',
      anchor: '.vfr__container',
    }
  },${additionalMethods}${hasOnPage}
  getNewShoeExperience() {
    return {
      enabled: true,
    }
  },
  getIsMeasurementsTableEnabled() {
    return true
  },${brandsComp}
})

const insertSizebayScript = (src, base) => {
  const script = document.createElement('script')
  script.id = base ? 'szb-vfr__base' : 'szb-vfr__module'
  script.setAttribute('src', src)

  document.querySelector('head').appendChild(script)
}

const sizebayStyles = () => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', \`\${STATIC_URL}\${TENANT_ID}/styles/styles_v4.css\`)

  document.querySelector('body').appendChild(link)
}

const sizebayImplantation = () => {
  insertSizebayScript(MODULE_URL, true)
  sizebayStyles()
}

const addToCart = () => {
${addToCartCode}
}

function SizebayInit() {
  if (!document.querySelectorAll('#szb-vfr__base').length) sizebayImplantation()
${initAddToCart}
  const payload = {
    permalink: SizebayPrescript().getPermalink(),
    tenantId: SizebayPrescript().getTenantId(),
    buttons: SizebayPrescript().getButtons(),
    anchor: SizebayPrescript().getAnchor(),
    lang: SizebayPrescript().getLanguage(),
    recommendation: SizebayPrescript().getRecommendationText(),
  }

  const sizebayRender = () => {
    console.log(\`Sizebay -> product: \${payload.permalink}\`)
    window?.Sizebay?.Implantation(payload)
  }

  window.addEventListener('sizebay:recommendation', () => {
    // This event is triggered when the recommendation is rendered
  })

  window.addEventListener('sizebay:rendered', () => {
    // This event is triggered when the buttons are availiable on the page
  })

  window.addEventListener('sizebay:loaded', () => {
    sizebayRender()
  })

  typeof window?.Sizebay?.Implantation === 'function' && sizebayRender()
}

SizebayInit()`;
  };

  const handleView = () => {
    setGeneratedScript(generateScript());
    setIsModalOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateScript());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const script = generateScript();
    const blob = new Blob([script], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sizebay-script.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tooltips = {
    tenant:
      appLang === "EN"
        ? "Unique identifier for your store tenant."
        : "Identificador único do tenant da sua loja.",
    buttonsAnchor:
      appLang === "EN"
        ? "CSS selector defining where the buttons will be injected on the page."
        : "Seletor CSS definindo onde os botões serão injetados na página.",
    defaultPermalink:
      appLang === "EN"
        ? "Enable if you want to use the default permalink structure. Disable to set custom domain and product selectors."
        : "Ative se quiser usar a estrutura padrão de permalink. Desative para configurar domínio e seletores customizados.",
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
  };

  return (
    <div className="Main">
      <div className="MainHeader">
        <h1 className="MainFormTitle">
          {appLang === "EN" ? "Create your script" : "Crie seu script"}
        </h1>
        <div className="AppLangSelector">
          <button
            className={`AppLangBtn ${appLang === "EN" ? "active" : ""}`}
            onClick={() => setAppLang("EN")}
          >
            EN
          </button>
          <button
            className={`AppLangBtn ${appLang === "BR" ? "active" : ""}`}
            onClick={() => setAppLang("BR")}
          >
            BR
          </button>
        </div>
      </div>

      <div className="MainForm">
        <TextInput
          title="Tenant ID"
          placeholder={appLang === "EN" ? "Store Tenant" : "Tenant da Loja"}
          tooltip={tooltips.tenant}
          value={tenantId}
          onChange={setTenantId}
        />
        <TextInput
          title="Buttons Anchor"
          placeholder={
            appLang === "EN"
              ? "CSS Selector for Buttons Anchoring"
              : "Seletor CSS para Ancoragem dos Botões"
          }
          tooltip={tooltips.buttonsAnchor}
          value={buttonsAnchor}
          onChange={setButtonsAnchor}
        />

        <ToggleBlock
          title="Default Permalink"
          checked={isDefaultPermalink}
          onChange={setIsDefaultPermalink}
          tooltip={tooltips.defaultPermalink}
        >
          {!isDefaultPermalink && (
            <div className="MainFormToggleInputTextInputs">
              <input
                className="MainFormTextInputInput"
                type="text"
                placeholder={
                  appLang === "EN" ? "Your store domain" : "Domínio da sua loja"
                }
                value={storeDomain}
                onChange={(e) => setStoreDomain(e.target.value)}
              />
              <span className="MainFormToggleInputTextInputsSeparator">+</span>
              <input
                className="MainFormTextInputInput"
                type="text"
                placeholder="Product ID CSS Selector"
                value={permalinkSelector}
                onChange={(e) => setPermalinkSelector(e.target.value)}
              />
            </div>
          )}
        </ToggleBlock>

        <ToggleBlock
          title={appLang === "EN" ? "Stock Break" : "Quebra de Estoque"}
          checked={isQuebraEstoque}
          onChange={setIsQuebraEstoque}
          tooltip={tooltips.stockBreak}
        >
          {isQuebraEstoque && (
            <div className="MainFormToggleInputTextInputs">
              <input
                className="MainFormTextInputInput"
                type="text"
                placeholder={
                  appLang === "EN"
                    ? "Available Sizes CSS Selector"
                    : "Seletor CSS dos Tamanhos Disponíveis"
                }
                value={stockBreakSelector}
                onChange={(e) => setStockBreakSelector(e.target.value)}
              />
            </div>
          )}
        </ToggleBlock>

        <ToggleBlock
          title={appLang === "EN" ? "Image on PDP" : "Imagem na PDP"}
          checked={isImagemPDP}
          onChange={setIsImagemPDP}
          tooltip={tooltips.imagePDP}
        >
          {isImagemPDP && (
            <div className="MainFormToggleInputTextInputs">
              <input
                className="MainFormTextInputInput"
                type="text"
                placeholder={
                  appLang === "EN"
                    ? "Product Image CSS Selector"
                    : "Seletor CSS da Imagem do Produto"
                }
                value={imagePDPSelector}
                onChange={(e) => setImagePDPSelector(e.target.value)}
              />
            </div>
          )}
        </ToggleBlock>

        <ToggleBlock
          title="Add To Cart"
          checked={isAddToCart}
          onChange={setIsAddToCart}
          tooltip={tooltips.addToCart}
        >
          {isAddToCart && (
            <div className="MainFormToggleInputTextInputs">
              <input
                className="MainFormTextInputInput"
                type="text"
                placeholder={
                  appLang === "EN"
                    ? "Buy Button CSS Selector"
                    : "Seletor CSS do Botão de Comprar"
                }
                value={addToCartSelector}
                onChange={(e) => setAddToCartSelector(e.target.value)}
              />
            </div>
          )}
        </ToggleBlock>

        <ToggleBlock
          title="OnPage"
          checked={isOnPage}
          onChange={setIsOnPage}
          tooltip={tooltips.onPage}
        />

        {isOnPage && (
          <div className="MainFormToggleInput">
            <h1 className="MainFormTextInputTitle">
              {appLang === "EN" ? "Size Selector" : "Seletor de Tamanhos"}
            </h1>
            <div className="MainFormToggleInputTextInputs">
              <input
                className="MainFormTextInputInput"
                type="text"
                placeholder={
                  appLang === "EN"
                    ? "Product Sizes CSS Selector"
                    : "Seletor CSS dos Tamanhos do Produto"
                }
                value={onPageSelector}
                onChange={(e) => setOnPageSelector(e.target.value)}
              />
            </div>
          </div>
        )}

        <ToggleBlock
          title={
            appLang === "EN"
              ? "Shoes Brands Comparison"
              : "Comparação de Marcas Shoes"
          }
          checked={isComparacao}
          onChange={setIsComparacao}
          tooltip={tooltips.brands}
        />

        <LanguageSelector
          selectedLangs={selectedLangs}
          onToggleLang={handleToggleLang}
          appLang={appLang}
        />
        <TranslationManager
          selectedLangs={selectedLangs}
          translations={translations}
          onChange={handleTranslationChange}
          appLang={appLang}
        />
      </div>

      <div className="MainActions">
        <button className="MainActionsButton" onClick={handleDownload}>
          {appLang === "EN" ? "Download Script" : "Baixar Script"}
        </button>
        <button
          className={`MainActionsButton ${isCopied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          {isCopied
            ? appLang === "EN"
              ? "Copied!"
              : "Copiado!"
            : appLang === "EN"
              ? "Copy Script"
              : "Copiar Script"}
        </button>
        <button className="MainActionsButton" onClick={handleView}>
          {appLang === "EN" ? "View Script" : "Ver Script"}
        </button>
      </div>

      {isModalOpen && (
        <div className="ModalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
            <div className="ModalHeader">
              <h2 className="ModalTitle">
                {appLang === "EN" ? "Generated Script" : "Script Gerado"}
              </h2>
              <button
                className="ModalClose"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <pre className="ModalBody">
              <code>{generatedScript}</code>
            </pre>
            <div className="MainActions" style={{ justifyContent: "flex-end" }}>
              <button
                className={`MainActionsButton ${isCopied ? "copied" : ""}`}
                onClick={handleCopy}
              >
                {isCopied
                  ? appLang === "EN"
                    ? "Copied!"
                    : "Copiado!"
                  : appLang === "EN"
                    ? "Copy to Clipboard"
                    : "Copiar Área de Transferência"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
