'use client';

import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  typography,
  textColor,
  SolidButton,
  borderColor,
  SegmentedControl,
  SegmentItem,
  brandColor,
} from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

// Import SVG icons as React components
import GovernmentIcon from '@/assets/icons/Icon_court.svg';
import FinancialIcon from '@/assets/icons/Icon_money.svg';
import HealthcareIcon from '@/assets/icons/Icon_heart.svg';
import EducationIcon from '@/assets/icons/Icon_compare.svg';
import ManufacturingIcon from '@/assets/icons/Leading Content.svg';
import FnbIcon from '@/assets/icons/icon_award_meal.svg';

const DEMO_CATEGORIES = [
  {
    id: 'Government',
    icon: GovernmentIcon,
    text: 'Government',
  },
  {
    id: 'Financial',
    icon: FinancialIcon,
    text: 'Financial',
  },
  {
    id: 'Healthcare',
    icon: HealthcareIcon,
    text: 'Healthcare',
  },
  {
    id: 'Education',
    icon: EducationIcon,
    text: 'Education',
  },
  {
    id: 'Manufacturing',
    icon: ManufacturingIcon,
    text: 'Manufacturing',
  },
  {
    id: 'F&B',
    icon: FnbIcon,
    text: 'F&B',
  },
];

export default function DemoSection() {
  const { t } = useTranslation('common');
  const [activeButton, setActiveButton] = useState('Government');
  const [simulationStep, setSimulationStep] = useState(0); // 0: 초기, 1: 캡슐화, 2: LLM 결과
  const [currentStep, setCurrentStep] = useState(0); // 세부 단계 관리
  const [typingText, setTypingText] = useState('');
  const [showDots, setShowDots] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedAction, setSelectedAction] = useState(0);
  const [llmAnswerTyping, setLlmAnswerTyping] = useState('');
  const [decryptTyping, setDecryptTyping] = useState('');
  const [demoData, setDemoData] = useState({
    original: '',
    capsuledHide: '',
    capsuledChange: '',
    question: '',
    answerHide: '',
    answerChange: '',
    answerUncapsuled: '',
  });
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
    if (buttonId === 'Government') {
      setDemoData({
        original: t('demo.data.Government.original'),
        capsuledHide: t('demo.data.Government.capsuledHide'),
        capsuledChange: t('demo.data.Government.capsuledChange'),
        question: t('demo.data.Government.question'),
        answerHide: t('demo.data.Government.answerHide'),
        answerChange: t('demo.data.Government.answerChange'),
        answerUncapsuled: t('demo.data.Government.answerUncapsuled'),
      });
    } else if (buttonId === 'Financial') {
      setDemoData({
        original: t('demo.data.Financial.original'),
        capsuledHide: t('demo.data.Financial.capsuledHide'),
        capsuledChange: t('demo.data.Financial.capsuledChange'),
        question: t('demo.data.Financial.question'),
        answerHide: t('demo.data.Financial.answerHide'),
        answerChange: t('demo.data.Financial.answerChange'),
        answerUncapsuled: t('demo.data.Financial.answerUncapsuled'),
      });
    } else if (buttonId === 'Education') {
      setDemoData({
        original: t('demo.data.Education.original'),
        capsuledHide: t('demo.data.Education.capsuledHide'),
        capsuledChange: t('demo.data.Education.capsuledChange'),
        question: t('demo.data.Education.question'),
        answerHide: t('demo.data.Education.answerHide'),
        answerChange: t('demo.data.Education.answerChange'),
        answerUncapsuled: t('demo.data.Education.answerUncapsuled'),
      });
    } else if (buttonId === 'Manufacturing') {
      setDemoData({
        original: t('demo.data.Manufacturing.original'),
        capsuledHide: t('demo.data.Manufacturing.capsuledHide'),
        capsuledChange: t('demo.data.Manufacturing.capsuledChange'),
        question: t('demo.data.Manufacturing.question'),
        answerHide: t('demo.data.Manufacturing.answerHide'),
        answerChange: t('demo.data.Manufacturing.answerChange'),
        answerUncapsuled: t('demo.data.Manufacturing.answerUncapsuled'),
      });
    } else if (buttonId === 'Healthcare') {
      setDemoData({
        original: t('demo.data.Healthcare.original'),
        capsuledHide: t('demo.data.Healthcare.capsuledHide'),
        capsuledChange: t('demo.data.Healthcare.capsuledChange'),
        question: t('demo.data.Healthcare.question'),
        answerHide: t('demo.data.Healthcare.answerHide'),
        answerChange: t('demo.data.Healthcare.answerChange'),
        answerUncapsuled: t('demo.data.Healthcare.answerUncapsuled'),
      });
    } else if (buttonId === 'F&B') {
      setDemoData({
        original: t('demo.data.F&B.original'),
        capsuledHide: t('demo.data.F&B.capsuledHide'),
        capsuledChange: t('demo.data.F&B.capsuledChange'),
        question: t('demo.data.F&B.question'),
        answerHide: t('demo.data.F&B.answerHide'),
        answerChange: t('demo.data.F&B.answerChange'),
        answerUncapsuled: t('demo.data.F&B.answerUncapsuled'),
      });
    }
    // 다른 버튼들도 나중에 추가
  };

  const handleRunSimulation = () => {
    setSimulationStep(1);
    setCurrentStep(1);
    startSimulationSequence();
  };

  const startSimulationSequence = () => {
    setTimeout(() => {
      setCurrentStep(1);
      scrollToBottom();
      // 스피너 표시 (4초)
      setTimeout(() => {
        setShowSpinner(true);
        setTimeout(() => {
          setShowSpinner(false);
          setCurrentStep(2);
          setTimeout(() => {
            scrollToBottom();
            setTimeout(() => {
              setCurrentStep(3);
              scrollToBottom();
              setTimeout(() => {
                setCurrentStep(4);
                scrollToBottom();
                setTimeout(() => {
                  setCurrentStep(5);
                  setTimeout(() => {
                    scrollToBottom();
                    setTimeout(() => {
                      setCurrentStep(6);
                      const llmAnswerText =
                        selectedAction === 0
                          ? demoData.answerHide
                          : demoData.answerChange;
                      const decryptText = demoData.answerUncapsuled;

                      let llmDone = false;
                      let decryptDone = false;

                      const checkCompletion = () => {
                        if (llmDone && decryptDone) {
                          setCurrentStep(7);
                        }
                      };

                      typeLlmAnswer(llmAnswerText, () => {
                        llmDone = true;
                        checkCompletion();
                      });
                      typeDecrypt(decryptText, () => {
                        decryptDone = true;
                        checkCompletion();
                      });
                    }, 300);
                  }, 500);
                }, 800);
              }, 800);
            }, 300);
          }, 1500);
        }, 3000);
      }, 500);
    }, 500);
  };

  const typeLlmAnswer = (text: string, onComplete?: () => void) => {
    setLlmAnswerTyping('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setLlmAnswerTyping(text.slice(0, index + 1));
        index++;
        if (index % 10 === 0) {
          scrollToBottom();
        }
      } else {
        clearInterval(interval);
        scrollToBottom();
        onComplete?.();
      }
    }, 20);
  };

  const typeDecrypt = (text: string, onComplete?: () => void) => {
    setDecryptTyping('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDecryptTyping(text.slice(0, index + 1));
        index++;
        if (index % 10 === 0) {
          scrollToBottom();
        }
      } else {
        clearInterval(interval);
        scrollToBottom();
        onComplete?.();
      }
    }, 20);
  };

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (simulationStep > 0) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentStep, simulationStep]);

  useEffect(() => {
    // 초기 로드 시 Government 데이터 설정
    setDemoData({
      original: t('demo.data.Government.original'),
      capsuledHide: t('demo.data.Government.capsuledHide'),
      capsuledChange: t('demo.data.Government.capsuledChange'),
      question: t('demo.data.Government.question'),
      answerHide: t('demo.data.Government.answerHide'),
      answerChange: t('demo.data.Government.answerChange'),
      answerUncapsuled: t('demo.data.Government.answerUncapsuled'),
    });
  }, [t]);

  const handleRestart = () => {
    setSimulationStep(0);
    setCurrentStep(0);
    setTypingText('');
    setShowDots('');
    setShowSpinner(false);
    setLlmAnswerTyping('');
    setDecryptTyping('');

    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = 0;
    }
  };

  return (
    <DemoContainer id='demo-section'>
      <DemoWrapper>
        <DemoContent>
          <LeftSection>
            <SectionTitle>{t('demo.title')}</SectionTitle>
          </LeftSection>
          <RightSection>
            <DemoTitle>{t('demo.mainTitle')}</DemoTitle>
            <DemoSubtitle>{t('demo.subtitle')}</DemoSubtitle>

            <DemoImageContainer>
              <ButtonGroup>
                {DEMO_CATEGORIES.map((category) => (
                  <DemoButton
                    key={category.id}
                    variant='secondary'
                    size='large'
                    state={activeButton === category.id ? 'focused' : 'default'}
                    onClick={() => handleButtonClick(category.id)}
                    leadingIcon={category.icon}
                  >
                    {t(`demo.categories.${category.id}`)}
                  </DemoButton>
                ))}
              </ButtonGroup>
              <ChatInterface>
                <ChatWindowControls>
                  <ControlButton $color='#ff5f57' />
                  <ControlButton $color='#ffbd2e' />
                  <ControlButton $color='#28ca42' />
                </ChatWindowControls>
                <ChatInnerContainer>
                  <ChatHeader>
                    <ChatTitle>Chat</ChatTitle>
                  </ChatHeader>
                  <ChatArea
                    ref={chatAreaRef}
                    $isSimulating={simulationStep === 1}
                  >
                    {simulationStep === 1 && (
                      <>
                        {/* 1단계: Safely capsuling 타이핑 */}
                        {currentStep >= 1 && (
                          <SimulationStatus>
                            <StatusMessage $isTyping={false}>
                              {t('demo.statusMessages.capsuling')}
                              {showSpinner && <LoadingSpinner />}
                            </StatusMessage>
                          </SimulationStatus>
                        )}

                        {/* 2단계: Original Document와 Capsuled Data 노출 */}
                        {currentStep >= 2 && (
                          <SimulationContainer>
                            <StepDocumentWrapper>
                              <LeftDocument>
                                <LeftDocumentHeader>
                                  <DocumentTitle>
                                    Original Document
                                  </DocumentTitle>
                                </LeftDocumentHeader>
                                <LeftDocumentContent>
                                  <DocumentText>
                                    {formatText(demoData.original)}
                                  </DocumentText>
                                </LeftDocumentContent>
                              </LeftDocument>

                              <RightDocument>
                                <RightDocumentHeader>
                                  <DocumentTitle>Capsuled Data</DocumentTitle>
                                </RightDocumentHeader>
                                <RightDocumentContent>
                                  <DocumentText>
                                    {selectedAction === 0
                                      ? formatText(demoData.capsuledHide)
                                      : formatText(demoData.capsuledChange)}
                                  </DocumentText>
                                </RightDocumentContent>
                              </RightDocument>
                            </StepDocumentWrapper>
                          </SimulationContainer>
                        )}

                        {/* 3단계: Send capsuled data 타이핑 */}
                        {currentStep >= 3 && (
                          <SimulationStatus>
                            <StatusMessage $isTyping={false}>
                              {t('demo.statusMessages.sending')}
                            </StatusMessage>
                          </SimulationStatus>
                        )}

                        {/* 4단계: 사용자 프롬프트 타이핑 */}
                        {currentStep >= 4 && (
                          <SimulationStatus>
                            <StatusMessage $isTyping={false}>
                              {demoData.question
                                ? formatText(demoData.question)
                                : 'Please convert the personal information in this document (name, resident registration number, contact information) into a summary form for civil petition submission.'}
                            </StatusMessage>
                          </SimulationStatus>
                        )}

                        {/* 5단계: LLM Answer와 Decrypt 노출 */}
                        {currentStep >= 6 && (
                          <SimulationContainer>
                            <StepDocumentWrapper>
                              <LeftDocument>
                                <LeftDocumentHeader>
                                  <DocumentTitle>LLM Answer</DocumentTitle>
                                </LeftDocumentHeader>
                                <LeftDocumentContent>
                                  <DocumentText>
                                    {currentStep >= 6 ? (
                                      <>
                                        {llmAnswerTyping
                                          ? formatText(llmAnswerTyping)
                                          : selectedAction === 0
                                            ? formatText(demoData.answerHide)
                                            : formatText(demoData.answerChange)}
                                      </>
                                    ) : (
                                      ''
                                    )}
                                  </DocumentText>
                                </LeftDocumentContent>
                              </LeftDocument>

                              <RightDocument>
                                <RightDocumentHeader>
                                  <DocumentTitle>
                                    Decrypt / Uncapsule
                                  </DocumentTitle>
                                </RightDocumentHeader>
                                <RightDocumentContent>
                                  <DocumentText>
                                    {currentStep >= 6 ? (
                                      <>
                                        {decryptTyping
                                          ? formatText(decryptTyping)
                                          : formatText(
                                              demoData.answerUncapsuled
                                            )}
                                      </>
                                    ) : (
                                      ''
                                    )}
                                  </DocumentText>
                                </RightDocumentContent>
                              </RightDocument>
                            </StepDocumentWrapper>
                          </SimulationContainer>
                        )}

                        {/* Restart 버튼 */}
                        {currentStep === 7 && (
                          <SimulationStatus $isRestart={true}>
                            <RestartButton onClick={handleRestart}>
                              Restart
                            </RestartButton>
                          </SimulationStatus>
                        )}
                      </>
                    )}

                    {simulationStep === 0 && (
                      <>
                        <OriginalDocument>
                          <DocumentHeader>
                            <DocumentTitle>Original Document</DocumentTitle>
                          </DocumentHeader>
                          <DocumentContentWrapper>
                            <DocumentContent>
                              <DocumentText>
                                {formatText(demoData.original)}
                              </DocumentText>
                            </DocumentContent>
                          </DocumentContentWrapper>
                        </OriginalDocument>

                        <SimulationCard>
                          <SimulationPrompt>
                            {formatText(demoData.question)}
                          </SimulationPrompt>
                          <ActionButtonGroup>
                            <SegmentedControl
                              value={selectedAction}
                              onChange={setSelectedAction}
                            >
                              <SegmentItem>
                                <ActionItemWrapper
                                  $isActive={selectedAction === 0}
                                >
                                  <ActionIcon $isActive={selectedAction === 0}>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'
                                    >
                                      <path
                                        d='M9.35547 16.4855C9.5863 15.5624 10.0812 14.7854 10.8403 14.1544C11.5993 13.5236 12.4863 13.2082 13.5013 13.2082C13.8334 13.2082 14.1539 13.2423 14.4628 13.3107C14.7715 13.3791 15.068 13.494 15.3523 13.6553C15.7016 13.1543 15.9805 12.5921 16.1888 11.9686C16.3971 11.3453 16.5013 10.689 16.5013 9.99984C16.5013 8.19428 15.8694 6.65956 14.6055 5.39567C13.3416 4.13178 11.8069 3.49984 10.0013 3.49984C8.19575 3.49984 6.66102 4.13178 5.39714 5.39567C4.13325 6.65956 3.5013 8.19428 3.5013 9.99984C3.5013 10.534 3.56325 11.0511 3.68714 11.5511C3.81116 12.0511 3.99498 12.5271 4.23859 12.979C4.80054 12.6991 5.36512 12.5007 5.93234 12.3836C6.4997 12.2666 7.08332 12.2082 7.68318 12.2082C8.07693 12.2082 8.47255 12.2391 8.87005 12.3011C9.26769 12.3629 9.63352 12.4371 9.96755 12.5238C9.76991 12.6446 9.59526 12.7833 9.44359 12.9398C9.29193 13.0962 9.1413 13.2562 8.99172 13.4196C8.82936 13.3919 8.62526 13.3636 8.37943 13.3348C8.13373 13.3059 7.90033 13.2915 7.67922 13.2915C7.18116 13.2915 6.687 13.3455 6.19672 13.4534C5.70644 13.5613 5.23908 13.7162 4.79464 13.9182C5.34589 14.6543 6.0195 15.2419 6.81547 15.6809C7.61144 16.12 8.45811 16.3882 9.35547 16.4855ZM10.0084 17.5832C8.96519 17.5832 7.98269 17.3858 7.06088 16.9911C6.13908 16.5964 5.33227 16.0532 4.64047 15.3617C3.94866 14.6702 3.40526 13.864 3.01026 12.9432C2.6154 12.0225 2.41797 11.0387 2.41797 9.99171C2.41797 8.94477 2.61533 7.96386 3.01005 7.049C3.40477 6.13414 3.9479 5.33081 4.63943 4.639C5.33095 3.9472 6.13714 3.4038 7.05797 3.0088C7.97866 2.61393 8.96248 2.4165 10.0094 2.4165C11.0564 2.4165 12.0373 2.61386 12.9521 3.00859C13.867 3.40331 14.6703 3.94643 15.3621 4.63796C16.0539 5.32949 16.5973 6.134 16.9923 7.0515C17.3872 7.96914 17.5846 8.94956 17.5846 9.99275C17.5846 11.0359 17.3873 12.0184 16.9926 12.9403C16.5978 13.8621 16.0547 14.6689 15.3632 15.3607C14.6716 16.0525 13.8671 16.5959 12.9496 16.9909C12.032 17.3857 11.0516 17.5832 10.0084 17.5832ZM7.74672 10.5415C7.03936 10.5415 6.43964 10.2939 5.94755 9.7988C5.45561 9.3038 5.20964 8.70262 5.20964 7.99525C5.20964 7.28789 5.4572 6.68817 5.95234 6.19609C6.44734 5.70414 7.04852 5.45817 7.75589 5.45817C8.46325 5.45817 9.06297 5.70574 9.55505 6.20088C10.047 6.69588 10.293 7.29706 10.293 8.00442C10.293 8.71178 10.0454 9.3115 9.55026 9.80359C9.05526 10.2955 8.45408 10.5415 7.74672 10.5415ZM7.7513 9.45817C8.152 9.45817 8.49519 9.31525 8.78089 9.02942C9.06672 8.74373 9.20964 8.40053 9.20964 7.99984C9.20964 7.59914 9.06672 7.25595 8.78089 6.97025C8.49519 6.68442 8.152 6.5415 7.7513 6.5415C7.35061 6.5415 7.00741 6.68442 6.72172 6.97025C6.43588 7.25595 6.29297 7.59914 6.29297 7.99984C6.29297 8.40053 6.43588 8.74373 6.72172 9.02942C7.00741 9.31525 7.35061 9.45817 7.7513 9.45817ZM13.5061 11.4517C12.9608 11.4517 12.4984 11.2635 12.1188 10.8871C11.7392 10.5106 11.5494 10.0498 11.5494 9.50463C11.5494 8.95935 11.7376 8.49692 12.114 8.11734C12.4905 7.73775 12.9514 7.54796 13.4965 7.54796C14.0418 7.54796 14.5042 7.73616 14.8838 8.11254C15.2634 8.48907 15.4532 8.94991 15.4532 9.49504C15.4532 10.0403 15.265 10.5028 14.8886 10.8823C14.5121 11.2619 14.0512 11.4517 13.5061 11.4517Z'
                                        fill='currentColor'
                                      />
                                    </svg>
                                  </ActionIcon>
                                  Hide
                                </ActionItemWrapper>
                              </SegmentItem>
                              <SegmentItem>
                                <ActionItemWrapper
                                  $isActive={selectedAction === 1}
                                >
                                  <ActionIcon $isActive={selectedAction === 1}>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'
                                    >
                                      <path
                                        d='M5.29036 10.022C5.29036 10.7432 5.44043 11.4085 5.74057 12.0181C6.04085 12.6278 6.51898 13.2195 7.17495 13.7933V12.782C7.17495 12.6286 7.22648 12.4999 7.32953 12.396C7.43259 12.2923 7.56023 12.2404 7.71245 12.2404C7.86481 12.2404 7.99391 12.2923 8.09974 12.396C8.20543 12.4999 8.25828 12.6286 8.25828 12.782V15.0577C8.25828 15.2474 8.19411 15.4065 8.06578 15.535C7.93731 15.6633 7.77821 15.7275 7.58849 15.7275H5.31286C5.15939 15.7275 5.03071 15.6759 4.92682 15.5729C4.82307 15.47 4.7712 15.3423 4.7712 15.19C4.7712 15.0376 4.82307 14.9086 4.92682 14.8029C5.03071 14.697 5.15939 14.6441 5.31286 14.6441H6.46516C5.69585 13.9604 5.12717 13.2373 4.75911 12.4748C4.39106 11.7121 4.20703 10.8969 4.20703 10.0291C4.20703 8.89024 4.50189 7.85656 5.09161 6.92809C5.68134 5.99947 6.46161 5.30017 7.43245 4.83017C7.56745 4.75961 7.69981 4.75475 7.82953 4.81559C7.95939 4.87656 8.05106 4.97892 8.10453 5.12267C8.15786 5.26628 8.15661 5.40524 8.10078 5.53954C8.04509 5.67371 7.94911 5.77586 7.81286 5.846C7.05634 6.24322 6.44675 6.81322 5.98411 7.556C5.52161 8.29878 5.29036 9.12079 5.29036 10.022ZM15.2493 10.016C15.0993 10.016 14.9645 9.96413 14.8449 9.86038C14.7252 9.75677 14.6525 9.62809 14.6268 9.47434C14.5564 8.84295 14.3791 8.26309 14.0949 7.73475C13.8106 7.20642 13.3865 6.69975 12.8224 6.21475V7.21788C12.8224 7.37135 12.7709 7.50003 12.6679 7.60392C12.5648 7.70767 12.4372 7.75954 12.2849 7.75954C12.1326 7.75954 12.0035 7.70767 11.8977 7.60392C11.792 7.50003 11.7391 7.37135 11.7391 7.21788V4.94225C11.7391 4.75253 11.8033 4.59343 11.9316 4.46496C12.0601 4.33663 12.2192 4.27246 12.4089 4.27246H14.6845C14.838 4.27246 14.9667 4.32399 15.0706 4.42704C15.1743 4.52996 15.2262 4.6576 15.2262 4.80996C15.2262 4.96232 15.1743 5.09135 15.0706 5.19704C14.9667 5.30288 14.838 5.35579 14.6845 5.35579H13.5322C14.1989 5.92941 14.7214 6.56774 15.0997 7.27079C15.4779 7.97385 15.7022 8.70836 15.7727 9.47434C15.7897 9.62809 15.7443 9.75677 15.6362 9.86038C15.5281 9.96413 15.3992 10.016 15.2493 10.016ZM12.5629 17.8877C12.4372 17.8877 12.3277 17.8411 12.2345 17.7481C12.1415 17.6549 12.0949 17.5454 12.0949 17.4198V14.5481C12.0949 14.4224 12.1415 14.3129 12.2345 14.2198C12.3277 14.1267 12.4372 14.0802 12.5629 14.0802H13.1029V13.0802C13.1029 12.6988 13.2395 12.3694 13.5127 12.092C13.786 11.8148 14.1188 11.6762 14.5112 11.6762C14.9036 11.6762 15.2349 11.8148 15.5052 12.092C15.7754 12.3694 15.9106 12.6988 15.9106 13.0802V14.0802H16.4506C16.5786 14.0802 16.686 14.1267 16.7727 14.2198C16.8592 14.3129 16.9024 14.4224 16.9024 14.5481V17.4198C16.9024 17.5454 16.8559 17.6549 16.7629 17.7481C16.6697 17.8411 16.5602 17.8877 16.4345 17.8877H12.5629ZM13.7566 14.0802H15.2566V13.0802C15.2566 12.8677 15.1852 12.6895 15.0424 12.5458C14.8995 12.402 14.7224 12.3302 14.5112 12.3302C14.2998 12.3302 14.1212 12.402 13.9754 12.5458C13.8295 12.6895 13.7566 12.8677 13.7566 13.0802V14.0802Z'
                                        fill='currentColor'
                                      />
                                    </svg>
                                  </ActionIcon>
                                  Change
                                </ActionItemWrapper>
                              </SegmentItem>
                            </SegmentedControl>
                            <RunSimulationButton onClick={handleRunSimulation}>
                              <ButtonIcon>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'
                                >
                                  <path
                                    d='M12.0003 10.9494C8.46406 10.2612 6.88093 6.83813 6.88093 3.75C6.88093 3.58424 6.81508 3.42527 6.69787 3.30806C6.58066 3.19085 6.42169 3.125 6.25593 3.125C6.09017 3.125 5.9312 3.19085 5.81399 3.30806C5.69678 3.42527 5.63093 3.58424 5.63093 3.75C5.63093 6.83813 4.04781 10.2612 0.511558 10.9494C0.369592 10.9775 0.241768 11.0539 0.1499 11.1657C0.0580316 11.2776 0.0078125 11.4178 0.0078125 11.5625C0.0078125 11.7072 0.0580316 11.8474 0.1499 11.9593C0.241768 12.0711 0.369592 12.1475 0.511558 12.1756C4.04781 12.8638 5.63093 16.2869 5.63093 19.375C5.63093 19.5408 5.69678 19.6997 5.81399 19.8169C5.9312 19.9342 6.09017 20 6.25593 20C6.42169 20 6.58066 19.9342 6.69787 19.8169C6.81508 19.6997 6.88093 19.5408 6.88093 19.375C6.88093 16.2869 8.46406 12.8638 12.0003 12.1756C12.1423 12.1475 12.2701 12.0711 12.362 11.9593C12.4538 11.8474 12.5041 11.7072 12.5041 11.5625C12.5041 11.4178 12.4538 11.2776 12.362 11.1657C12.2701 11.0539 12.1423 10.9775 12.0003 10.9494ZM19.5059 5.95062C16.6934 5.375 15.9434 2.33187 15.9434 0.625C15.9434 0.45924 15.8776 0.300269 15.7604 0.183058C15.6432 0.065848 15.4842 0 15.3184 0C15.1527 0 14.9937 0.065848 14.8765 0.183058C14.7593 0.300269 14.6934 0.45924 14.6934 0.625C14.6934 2.33187 13.9434 5.375 11.1309 5.95062C10.9903 5.97991 10.8641 6.05673 10.7734 6.16817C10.6828 6.27961 10.6333 6.41886 10.6333 6.5625C10.6333 6.70614 10.6828 6.84539 10.7734 6.95683C10.8641 7.06827 10.9903 7.14509 11.1309 7.17438C13.9434 7.75063 14.6934 10.7931 14.6934 12.5C14.6934 12.6658 14.7593 12.8247 14.8765 12.9419C14.9937 13.0592 15.1527 13.125 15.3184 13.125C15.4842 13.125 15.6432 13.0592 15.7604 12.9419C15.8776 12.8247 15.9434 12.6658 15.9434 12.5C15.9434 10.7931 16.6934 7.75 19.5059 7.17438C19.6466 7.14509 19.7728 7.06827 19.8634 6.95683C19.954 6.84539 20.0035 6.70614 20.0035 6.5625C20.0035 6.41886 19.954 6.27961 19.8634 6.16817C19.7728 6.05673 19.6466 5.97991 19.5059 5.95062Z'
                                    fill='white'
                                  />
                                </svg>
                              </ButtonIcon>
                              Run Simulation
                            </RunSimulationButton>
                          </ActionButtonGroup>
                        </SimulationCard>
                      </>
                    )}
                  </ChatArea>
                </ChatInnerContainer>
              </ChatInterface>
            </DemoImageContainer>
          </RightSection>
        </DemoContent>
      </DemoWrapper>
    </DemoContainer>
  );
}

const DemoContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DemoWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 160px 240px 80px 240px;
  margin: 0 auto;

  @media (max-width: 1440px) {
    padding: 160px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const DemoContent = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const LeftSection = styled.div`
  flex: 0 0 auto;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  ${typography(undefined, 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin-top: 16px;
`;

const DemoTitle = styled.h3`
  ${typography(undefined, 'display1', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 12px 0;
`;

const DemoSubtitle = styled.p`
  ${typography(undefined, 'heading2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 40px 0;
`;

const DemoImageContainer = styled.div`
  background-image: url('/images/bg-demo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  padding: 64px 64px 0 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  padding: 8px;

  align-items: flex-start;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid #fff;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.5) 100%);

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
`;

const DemoButton = styled(SolidButton)`
  transition: all 0.2s ease;
`;

const ChatInterface = styled.div`
  width: 100%;
  max-width: 1032px;
  height: 650px;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(6px);
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ChatWindowControls = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px 0 20px 16px;
`;

const ControlButton = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
`;

const ChatInnerContainer = styled.div`
  height: 742px;
  border-radius: 16px 16px 0 0;
  border-top: 1px solid #e7e7e7;

  border-right: 1px solid #e7e7e7;

  border-left: 1px solid #e7e7e7;

  background: linear-gradient(
    180deg,
    #fff 10.63%,
    rgba(255, 255, 255, 0.5) 100%
  );
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0 24px;
`;

const ChatHeader = styled.div`
  border-radius: 16.414px 16.414px 0 0;
  border-bottom: 1px solid var(--border-primary, #e6e7e9);
  background: #fff;
  display: flex;
  align-items: center;
  padding: 8px 24px;
`;

const ChatTitle = styled.h3`
  padding: 8px;
  ${typography(undefined, 'heading1', 'bold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const ChatArea = styled.div<{ $isSimulating?: boolean }>`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isSimulating ? '24px' : '43px')};
  align-items: center;
  padding: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const OriginalDocument = styled.div`
  border-radius: var(--Radius-rounded-5, 20px);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.01) 7.56%,
    rgba(255, 255, 255, 0.01) 89.51%
  );

  box-shadow: 0 0 96.88px 0 rgba(255, 89, 158, 0.24);

  width: 800px;
`;

const DocumentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 12px 24px;
`;

const DocumentContentWrapper = styled.div`
  padding: 12px 25px;
`;

const DocumentTitle = styled.h3`
  ${typography(undefined, 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0;
`;

const DocumentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(
    180deg,
    #fff 7.09%,
    rgba(255, 255, 255, 0.5) 63.2%
  );

  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 8px;
  padding: 12px;
  max-height: 216px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const DocumentText = styled.div`
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const SimulationStatus = styled.div<{ $isRestart?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$isRestart ? 'center' : 'flex-end')};
  width: 864px;
`;

const StatusMessage = styled.div<{ $isTyping?: boolean }>`
  border-radius: 20px;
  padding: 16px 24px;
  max-width: 720px;
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  border: 1px solid #fff;
  background: #fff;
  box-shadow: 0 0 96.88px 0 rgba(89, 89, 255, 0.07);
  position: relative;
  animation: fadeInUp 0.5s ease-out;

  &::after {
    content: ${(props) => (props.$isTyping ? '|' : '')};
    animation: ${(props) => (props.$isTyping ? 'blink 1s infinite' : 'none')};
    margin-left: 2px;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StepDocumentWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 864px;
  border: 1px solid #e9ecef;
  padding: 24px;
  border-radius: 24px;
  background: linear-gradient(
    180deg,
    #fff 7.09%,
    rgba(255, 255, 255, 0.5) 63.2%
  );
  box-shadow: 0 0 40px 0 rgba(89, 89, 255, 0.1);
  max-width: 100%;
`;

const SimulationContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  animation: fadeInUp 0.5s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LeftDocument = styled.div`
  opacity: 0.8;
  flex: 1;
  min-width: 0;
`;

const RightDocument = styled.div`
  filter: drop-shadow(0 0 96.88px rgba(255, 89, 158, 0.24));
  flex: 1;
  min-width: 0;
`;

const RestartButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 22px;
  position: relative;
  border-radius: 99px;
  background: #000;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  ${typography(undefined, 'body3', 'semibold')}
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px; /* 보더 두께 */
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      #263fff 0%,
      #ff32d3 30%,
      white 65%,
      #263fff 100%
    );
    background-size: 200% 100%;
    animation: moveGradient 3s linear infinite;

    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0) border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    padding: 2px;
    pointer-events: none;
    z-index: -1;
  }

  &:hover {
    background: #333;
    transform: translateY(-1px);
  }

  @keyframes moveGradient {
    0% {
      background-position: 0% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SimulationCard = styled.div`
  --bw: 1px;
  --radius: 20px;

  position: relative;
  border-radius: var(--radius);
  padding: 16px 24px;
  background: transparent;
  isolation: isolate;

  > * {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: var(--bw);
    background: linear-gradient(
      34deg,
      #9d57ff 0%,
      white 7%,
      #d6baff 37%,
      #bc7dff 62%,
      white 84%,
      #d6baff 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0) border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    pointer-events: none;
    z-index: 0;
  }

  background: linear-gradient(101deg, #f1e6ff 11.64%, #fff 57.14%);

  box-shadow:
    0 0 96.88px 0 rgba(89, 89, 255, 0.24),
    0 0 96.88px 0 rgba(89, 89, 255, 0.24);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 640px;
`;

const SimulationPrompt = styled.div`
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ActionItemWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  gap: 8px;

  ${typography(undefined, 'body2', 'semibold')}

  color: ${(props) =>
    props.$isActive
      ? brandColor.light['fg-brand-primary']
      : textColor.light['fg-neutral-assistive']};
`;

const ActionIcon = styled.span<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.$isActive
      ? brandColor.light['fg-brand-primary']
      : textColor.light['fg-neutral-assistive']};

  svg {
    width: 20px;
    height: 20px;
  }
`;

const RunSimulationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  position: relative;
  border-radius: 99px;
  background: #000;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  ${typography(undefined, 'body3', 'semibold')}
  margin-left: auto;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px; /* 보더 두께 */
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      #263fff 0%,
      #ff32d3 30%,
      white 65%,
      #263fff 100%
    );
    background-size: 200% 100%;
    animation: moveGradient 3s linear infinite;

    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0) border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    padding: 2px;
    pointer-events: none;
    z-index: -1;
  }

  &:hover {
    background: #333;
    transform: translateY(-1px);
  }

  @keyframes moveGradient {
    0% {
      background-position: 0% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ButtonIcon = styled.span`
  font-size: 16px;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.span`
  margin-left: 8px;
  width: 16px;
  height: 16px;
  border: 2px solid ${borderColor.light['color-border-focused']};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-block;
`;

const LeftDocumentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 12px 24px;
  border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 24px 24px 0 0;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.5) 50%);
  box-shadow:
    0 0 96.88px 0 rgba(89, 89, 255, 0.24),
    0 0 96.88px 0 rgba(89, 89, 255, 0.24);
`;

const LeftDocumentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 0 0 24px 24px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 7.09%,
    rgba(255, 255, 255, 0.25) 63.2%
  );
  box-shadow: 0 0 96.88px 0 rgba(89, 89, 255, 0.24);
  padding: 12px;
  max-height: 216px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

// 오른쪽 문서용 헤더와 컨텐츠
const RightDocumentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 12px 24px;
  border-radius: 24px 24px 0 0;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.5) 50%);
  box-shadow:
    0 0 96.88px 0 rgba(89, 89, 255, 0.24),
    0 0 96.88px 0 rgba(89, 89, 255, 0.24);
`;

const RightDocumentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 0 0 24px 24px;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  background: linear-gradient(
    180deg,
    #fff 7.09%,
    rgba(255, 255, 255, 0.5) 63.2%
  );
  box-shadow: 0 0 96.88px 0 rgba(89, 89, 255, 0.24);

  padding: 12px;
  max-height: 216px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
