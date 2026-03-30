import { AppState } from "../types";

export const generateScript = (state: AppState) => {
  const tenant = state.tenantId || "xxxx";
  const anchor = state.buttonsAnchor || "#sizebay-container";

  let permalinkFunc = `\n  getPermalink() {\n    return window.location.href\n  },`;
  if (
    !state.isDefaultPermalink &&
    state.storeDomain &&
    state.permalinkSelector
  ) {
    permalinkFunc = `\n  getPermalink() {\n    return 'https://${state.storeDomain}/' + document.querySelector('${state.permalinkSelector}')?.textContent.trim()\n  },`;
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

  if (state.selectedLangs.length > 0) {
    langTextsObj = {};
    state.selectedLangs.forEach((lang) => {
      langTextsObj[lang] = {
        buttons: {
          vfr: state.translations[lang]?.btnVirtual || "Provador Virtual",
          measurements:
            state.translations[lang]?.btnSize || "Tabela de Medidas",
        },
        recommendation: {
          default:
            state.translations[lang]?.txtRec ||
            "Recomendamos {size} para {profileName}",
          simplified:
            state.translations[lang]?.txtRec ||
            "Recomendamos o tamanho {size} para <b>Você</b>",
        },
      };
    });
  }

  const langTextsString = `const LanguagesTexts = ${JSON.stringify(
    langTextsObj,
    null,
    2
  ).replace(/"([^(")"]+)":/g, "$1:")}`;

  let additionalMethods = "";
  if (state.isOnPage && state.onPageSelector)
    additionalMethods += `\n  getProductSizes() {\n    return [...document.querySelectorAll('${state.onPageSelector}')].map((size) => size.textContent)\n  },`;
  else
    additionalMethods += `\n  getProductSizes() {\n    return [...document.querySelectorAll('.sizes')].map((size) => size.textContent)\n  },`;

  if (state.isQuebraEstoque && state.stockBreakSelector)
    additionalMethods += `\n  getSizesInStock() {\n    return [...document.querySelectorAll('${state.stockBreakSelector}:not(.disabled)')].map((size) => size.textContent)\n  },`;
  else
    additionalMethods += `\n  getSizesInStock() {\n    return [...document.querySelectorAll('.size:not(.disabled)')].map((size) => size.textContent)\n  },`;

  if (state.isImagemPDP && state.imagePDPSelector)
    additionalMethods += `\n  getPageProductImg() {\n    return document.querySelector('${state.imagePDPSelector}')?.src || null\n  },`;

  let hasOnPage = state.isOnPage
    ? `\n  hasOnPageIntegration() {\n    return true\n  },`
    : `\n  hasOnPageIntegration() {\n    return false\n  },`;
  let brandsComp = state.isComparacao
    ? `\n  getBrandsComparison() {\n    return true\n  },`
    : `\n  getBrandsComparison() {\n    return false\n  },`;
  let addToCartCode = `  const payload = { products: [] }\n  payload.products.push({ permalink: window?.SizebayPrescript().getPermalink() })\n  window.Sizebay.events.addToCart(payload, TENANT_ID)`;
  let initAddToCart =
    state.isAddToCart && state.addToCartSelector
      ? `\n  document.querySelector('${state.addToCartSelector}')?.addEventListener('click', addToCart)\n`
      : ``;

  return `const TENANT_ID = ${tenant}
const STATIC_URL = 'https://static.sizebay.technology/'
const MODULE_URL = 'https://vfr-v3-production.sizebay.technology/V4/implantation/index.js'
const LANG = document.querySelector('html')?.lang?.split('-').pop().toLocaleLowerCase() || '${
    state.selectedLangs[0] || "br"
  }'

${langTextsString}

window.SizebayPrescript = () => ({${permalinkFunc}
  getAnchor() {
    return { web: '${anchor}', mobile: '${anchor}' }
  },
  getTenantId() { return TENANT_ID },
  getLanguage() { return LANG },
  getButtons() {
    return {
      order: [
        { name: 'vfr', text: LanguagesTexts[LANG]?.buttons?.vfr || LanguagesTexts['${
          state.selectedLangs[0] || "br"
        }'].buttons.vfr },
        { name: 'measurements', text: LanguagesTexts[LANG]?.buttons?.measurements || LanguagesTexts['${
          state.selectedLangs[0] || "br"
        }'].buttons.measurements },
      ],
      position: 'after',
      class: 'vfr__button--clean',
    }
  },
  getRecommendationText() {
    return {
      default: LanguagesTexts[LANG]?.recommendation?.default || LanguagesTexts['${
        state.selectedLangs[0] || "br"
      }'].recommendation.default,
      simplified: LanguagesTexts[LANG]?.recommendation?.simplified || LanguagesTexts['${
        state.selectedLangs[0] || "br"
      }'].recommendation.simplified,
      order: 'before',
      anchor: '.vfr__container',
    }
  },${additionalMethods}${hasOnPage}
  getNewShoeExperience() { return { enabled: true } },
  getIsMeasurementsTableEnabled() { return true },${brandsComp}
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
  link.setAttribute('href', \`\${STATIC_URL}\${TENANT_ID}/styles/theme_v4.css\`)
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

  window.addEventListener('sizebay:recommendation', () => {})
  window.addEventListener('sizebay:rendered', () => {})
  window.addEventListener('sizebay:loaded', () => { sizebayRender() })

  typeof window?.Sizebay?.Implantation === 'function' && sizebayRender()
}

SizebayInit()`;
};

export const generateConfigJson = (state: AppState) => {
  const configObj = {
    general: {
      theme: {
        name: state.storeName || "$STORE_NAME",
        css: `https://static.sizebay.technology/${
          state.tenantId || "$TENANT_ID"
        }/styles/theme_v4.css`,
      },
      gender: state.storeGender === "U" ? null : state.storeGender,
      language: state.selectedLangs.length > 0 ? state.selectedLangs : ["br"],
      customLanguage: state.isCustomLanguage,
      isMetric: !state.isMetric,
      ageSwitcher: false,
      measurementSwitcher: state.isMeasurementSwitcher,
      is3dFeel: true,
      enableSkinTones: state.isSkinTones,
      filterChartByClothesType: state.isFilterChart,
    },
    optionalSteps: {
      BodyAdjustment: state.isBodyAdjustment,
      Calculating: state.isCalculating,
    },
  };
  return JSON.stringify(configObj, null, 2);
};
