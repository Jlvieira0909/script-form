"use client";

import { useState, useEffect } from "react";
import { AppState } from "../types";
import { getTooltips } from "../constants";
import { generateScript, generateConfigJson } from "../utils/generators";
import { Modal } from "../components/UI";
import { Step1Script, Step2Config, Step3Theme } from "../components/Steps";
import "./main.css";

export default function Home() {
  const [appLang, setAppLang] = useState<"EN" | "BR">("EN");
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [state, setState] = useState<AppState>({
    tenantId: "",
    buttonsAnchor: "",
    storeDomain: "",
    permalinkSelector: "",
    stockBreakSelector: "",
    imagePDPSelector: "",
    addToCartSelector: "",
    onPageSelector: "",
    isDefaultPermalink: true,
    isQuebraEstoque: false,
    isImagemPDP: false,
    isAddToCart: false,
    isOnPage: false,
    isComparacao: false,
    selectedLangs: [],
    translations: {},
    storeName: "",
    storeGender: "U",
    isCustomLanguage: false,
    isMetric: false,
    isMeasurementSwitcher: false,
    isSkinTones: true,
    isFilterChart: true,
    isBodyAdjustment: true,
    isCalculating: false,
    selectedButtonStyle: 1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"script" | "config" | "css">(
    "script"
  );
  const [isCopied, setIsCopied] = useState(false);
  const [themeCssContent, setThemeCssContent] = useState("");

  const updateState = (key: string, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    fetch(`/styles/stylesV4_${state.selectedButtonStyle}.css`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then((text) => setThemeCssContent(text))
      .catch(() =>
        setThemeCssContent(
          `/* \n  Arquivo não encontrado.\n  Certifique-se de criar o arquivo: \n  public/styles/stylesV4_${state.selectedButtonStyle}.css \n*/`
        )
      );
  }, [state.selectedButtonStyle]);

  const handleCopy = () => {
    const content =
      activeTab === "script"
        ? generateScript(state)
        : activeTab === "config"
        ? generateConfigJson(state)
        : themeCssContent;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadSingle = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    handleDownloadSingle("prescript.js", generateScript(state));
    setTimeout(
      () => handleDownloadSingle("config_v4.json", generateConfigJson(state)),
      500
    );
    setTimeout(
      () => handleDownloadSingle("theme_v4.css", themeCssContent),
      1000
    );
  };

  const tooltips = getTooltips(appLang);
  const currentContent =
    activeTab === "script"
      ? generateScript(state)
      : activeTab === "config"
      ? generateConfigJson(state)
      : themeCssContent;

  return (
    <div className="Main">
      <div className="MainHeader">
        <h1 className="MainPageTitle">
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

      <div className="StepsTabs">
        <button
          className={`StepTab ${currentStep === 1 ? "active" : ""}`}
          onClick={() => setCurrentStep(1)}
        >
          Step 1: Base Script
        </button>
        <button
          className={`StepTab ${currentStep === 2 ? "active" : ""}`}
          onClick={() => setCurrentStep(2)}
        >
          Step 2: Config JSON
        </button>
        <button
          className={`StepTab ${currentStep === 3 ? "active" : ""}`}
          onClick={() => setCurrentStep(3)}
        >
          Step 3: Button Styles
        </button>
      </div>

      <div className="MainForm">
        {currentStep === 1 && (
          <Step1Script
            state={state}
            updateState={updateState}
            appLang={appLang}
            tooltips={tooltips}
            handleToggleLang={(val: string) =>
              updateState(
                "selectedLangs",
                state.selectedLangs.includes(val)
                  ? state.selectedLangs.filter((l) => l !== val)
                  : [...state.selectedLangs, val]
              )
            }
            handleTranslationChange={(
              lang: string,
              field: string,
              value: string
            ) =>
              updateState("translations", {
                ...state.translations,
                [lang]: {
                  ...(state.translations[lang] || {
                    btnVirtual: "",
                    btnSize: "",
                    txtRec: "",
                  }),
                  [field]: value,
                },
              })
            }
          />
        )}
        {currentStep === 2 && (
          <Step2Config
            state={state}
            updateState={updateState}
            appLang={appLang}
            tooltips={tooltips}
          />
        )}
        {currentStep === 3 && (
          <Step3Theme
            state={state}
            updateState={updateState}
            appLang={appLang}
          />
        )}
      </div>

      <div className="MainActions">
        <button
          className="MainActionsButton primary"
          onClick={handleDownloadAll}
        >
          {appLang === "EN" ? "Download All Files" : "Baixar Todos os Arquivos"}
        </button>
        <button
          className="MainActionsButton"
          onClick={() => setIsModalOpen(true)}
        >
          {appLang === "EN" ? "View Scripts" : "Ver Scripts"}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={appLang === "EN" ? "Generated Files" : "Arquivos Gerados"}
        tabs={[
          { id: "script", label: "prescript.js" },
          { id: "config", label: "config_v4.json" },
          { id: "css", label: "styles_v4.css" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        content={currentContent}
        onCopy={handleCopy}
        isCopied={isCopied}
        copyText={
          isCopied
            ? appLang === "EN"
              ? "Copied!"
              : "Copiado!"
            : appLang === "EN"
            ? "Copy to Clipboard"
            : "Copiar Código"
        }
      />
    </div>
  );
}
