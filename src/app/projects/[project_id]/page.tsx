"use client";

import { useState, useEffect, useMemo } from "react";
import { useSpring, animated } from "react-spring";
import { Question } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import GroupAnswerSettings from "@/components/interfaces/Messages/group-answer-settings";

import { Separator } from "@/components/ui/separator";
import SectionsNav from "@/components/interfaces/Projects/Sections";

import { useMail } from "@/components/interfaces/Projects/use-mail";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Plus,
  Minus,
  Loader,
  ChevronDown,
  Check,
  Search,
  Lasso,
  Sparkles,
  Play,
  Pause,
  Square,
  TriangleAlert,
} from "lucide-react"; // Import icons

import MessageDisplay from "@/components/interfaces/Projects/message-display";
import QuestionList from "@/components/interfaces/Projects/message-list";

interface Section {
  id: number;
  name: string;
  subSections: SubSection[];
}

interface StagedChange {
  id: number;
  question: string;
  answer: string;
}

interface SubSection {
  id: number;
  name: string;
  questions: Question[];
}

interface Project {
  id: number;
  companyName: string;
  projectType: string;
  dueDate: string;
  name: string;
}

interface EditedAnswer {
  id: number;
  question: string;
  answer: string;
  originalAnswer: string | null;
}

interface GroupAnswerSettings {
  model: string;
  temperature: number;
  relevance: number;
  styleExaggeration: number;
  context: string;
}

export default function ProjectPage({ params }: { params: { project_id: string } }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showEmptyOnly, setShowEmptyOnly] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [processedQuestions, setProcessedQuestions] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [mail, setMail] = useMail();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState<{ [key: number]: boolean }>({});
  const [isSelectedChangeOpen, setIsSelectedChangeOpen] = useState(false);
  const [selectedChange, setSelectedChange] = useState<Question | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2000);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const [editedAnswers, setEditedAnswers] = useState<EditedAnswer[]>([]);
  const [aiAnswers, setAiAnswers] = useState<{ [key: number]: string }>({});

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isAnsweringAll, setIsAnsweringAll] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const [globalContext, setGlobalContext] = useState("");
  const [groupAnswerSettings, setGroupAnswerSettings] = useState<GroupAnswerSettings>({
    model: "gpt-4o-mini",
    temperature: 80,
    relevance: 80,
    styleExaggeration: 20,
    context: "",
  });

  const [stagedChanges, setStagedChanges] = useState<StagedChange[]>([]);
  const [isStagedChangesOpen, setIsStagedChangesOpen] = useState(true);
  const [isChangesOpen, setIsChangesOpen] = useState(true);

  const [isCommitting, setIsCommitting] = useState(false);
  const [commitProgress, setCommitProgress] = useState(0);
  const [commitMessage, setCommitMessage] = useState("");

  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const animatedProgress = useSpring({ value: Math.max(commitProgress, simulatedProgress), from: { value: 0 } });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.project_id}?fields=@narrow`);
        const data = await response.json();
        setCurrentProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/projects/${params.project_id}/entries?page=${currentPage}&pageSize=${pageSize}`
        );
        const data = await response.json();

        const sections = await fetch(`/api/projects/${params.project_id}/sections`);

        const formattedQuestions = data.items.map((item: any) => {
          const editedAnswer = editedAnswers.find((ea) => ea.id === item.id);
          return {
            id: item.id,
            question: item.question,
            assignee: item.assignee,
            reviewer: item.reviewer,
            answer: {
              text: editedAnswer ? editedAnswer.answer : item.answer.text,
              complianceAnswers: item.answer.complianceAnswers,
            },
            originalAnswer: item.answer.text,
            selected: true,
            isEdited: editedAnswer ? editedAnswer.answer !== item.answer.text : false,
            section: item.section,
            subSection: item.subSection,
          };
        });

        setQuestions(formattedQuestions);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
      setIsLoading(false);
    };

    fetchQuestions();
  }, [params.project_id, currentPage, pageSize, editedAnswers]);

  const filteredQuestions: Question[] = useMemo(() => {
    if (!searchQuery.trim()) return questions;

    const lowercaseQuery = searchQuery.toLowerCase();

    return questions.filter(
      (item) =>
        item.question.toLowerCase().includes(lowercaseQuery) ||
        (item.answer.text && item.answer.text.toLowerCase().includes(lowercaseQuery)) ||
        (item.assignee &&
          ((item.assignee.name && item.assignee.name.toLowerCase().includes(lowercaseQuery)) ||
            (!item.assignee.name && "no name".includes(lowercaseQuery))))
    );
  }, [questions, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const shouldIgnoreAnswer = (answer: string) => {
    return answer.includes("Not enough information to answer properly");
  };

  const handleSectionSelect = (sectionId: string) => {
    console.log("Selected section:", sectionId);
    // Handle the section selection here
  };

  const handleItemClick = (id: number) => {
    setMail((prevMail) => ({ ...prevMail, selected: id.toString() }));
  };

  const handleAnswerChange = (id: string, newAnswer: string) => {
    const sanitizedAnswer = sanitizeHtml(newAnswer);
    const question = questions.find((q) => q.id === Number(id));
    if (!question) return;

    setEditedAnswers((prev) => {
      const existingIndex = prev.findIndex((ea) => ea.id === Number(id));
      if (existingIndex >= 0) {
        return prev.map((ea) => (ea.id === Number(id) ? { ...ea, answer: sanitizedAnswer } : ea));
      } else {
        return [
          ...prev,
          {
            id: Number(id),
            question: question.question,
            answer: sanitizedAnswer,
            originalAnswer: question.originalAnswer,
          },
        ];
      }
    });

    // Update only the questions state, preserving the original answer
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === Number(id)) {
          return {
            ...q,
            answer: { ...q.answer, text: sanitizedAnswer },
            isEdited: sanitizedAnswer !== q.originalAnswer,
          };
        }
        return q;
      })
    );
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map((q) => q.id));
    }
  };

  const handleSelectQuestion = (id: number) => {
    setSelectedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]));
  };

  const handleDiscardAllChanges = (questionId?: number) => {
    if (questionId) {
      setEditedAnswers((prev) => prev.filter((ea) => ea.id !== questionId));
    } else {
      setEditedAnswers([]);
    }

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (questionId === undefined || q.id === questionId) {
          return {
            ...q,
            answer: {
              ...q.answer,
              text: q.originalAnswer,
            },
            isEdited: false,
          };
        }
        return q;
      })
    );

    // If a specific question was discarded, remove it from stagedChanges
    if (questionId !== undefined) {
      setStagedChanges((prev) => prev.filter((sc) => sc.id !== questionId));
    }
  };

  const handleCommitChanges = async () => {
    if (!commitMessage.trim()) {
      // You might want to show an error message to the user here
      console.error("Commit message is required");
      return;
    }
    setIsCommitting(true);
    setCommitProgress(0);
    setSimulatedProgress(0);
    setIsStagedChangesOpen(false);
    setIsChangesOpen(false);
    const totalQuestions = stagedChanges.length;
    let processedQuestions = 0;

    const simulationInterval = setInterval(() => {
      setSimulatedProgress((prev) => {
        const target = ((processedQuestions + 1) / totalQuestions) * 100;
        const step = (target - prev) * 0.1;
        return Math.min(prev + step, 99);
      });
    }, 100);

    for (const stagedChange of stagedChanges) {
      try {
        const response = await fetch(`/api/projects/${params.project_id}/entries?projectEntryId=${stagedChange.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: {
              text: stagedChange.answer,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update question ${stagedChange.id}`);
        }

        const data = await response.json();

        processedQuestions++;
        const actualProgress = (processedQuestions / totalQuestions) * 100;
        setCommitProgress(actualProgress);

        setEditedAnswers((prev) => prev.filter((ea) => ea.id !== stagedChange.id));

        // Update the local state if the question is on the current page
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) => (q.id === stagedChange.id ? { ...q, isEdited: false, answer: data.answer } : q))
        );
      } catch (error) {
        console.error(`Error updating question ${stagedChange.id}:`, error);
      }
    }

    // Clear all staged changes after committing

    clearInterval(simulationInterval);
    setCommitProgress(100);
    setSimulatedProgress(100);

    setStagedChanges([]);
    setIsCommitting(false);
    setCommitProgress(0);
    setCommitMessage("");
  };

  const sanitizeHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleAnswerAllQuestions = async () => {
    setIsAnsweringAll(true);
    setProgress(0);
    setIsPaused(false);
    const questionsToAnswer = questions.filter((q) => selectedQuestions.includes(q.id));
    const totalQuestions = questionsToAnswer.length;
    let processedQuestions = 0;
    setTotalQuestions(totalQuestions);

    const newController = new AbortController();
    setController(newController);

    const newAiAnswers = { ...aiAnswers };
    const newEditedAnswers = [...editedAnswers];

    const processQuestion = async (question: Question) => {
      if (newController.signal.aborted) return;

      try {
        const response = await fetch("/api/search", {
          method: "POST",
          body: JSON.stringify({
            query: question.question,
            context: groupAnswerSettings.context,
            options: groupAnswerSettings,
            db: { value: "11279" },
          }),
          signal: newController.signal,
        });

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedAnswer = "";

        while (true) {
          if (newController.signal.aborted) {
            reader.cancel();
            break;
          }

          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedAnswer += chunk;

          // Update the AI answer in real-time
          newAiAnswers[question.id] = accumulatedAnswer;
          setAiAnswers({ ...newAiAnswers });
        }

        if (!newController.signal.aborted) {
          // Update editedAnswers only if not aborted
          const existingIndex = newEditedAnswers.findIndex((ea) => ea.id === question.id);
          if (existingIndex >= 0) {
            newEditedAnswers[existingIndex] = { ...newEditedAnswers[existingIndex], answer: accumulatedAnswer };
          } else {
            newEditedAnswers.push({
              id: question.id,
              question: question.question,
              answer: accumulatedAnswer,
              originalAnswer: question.originalAnswer || "",
            });
          }

          processedQuestions++;
          setProcessedQuestions(processedQuestions);
          setProgress((processedQuestions / totalQuestions) * 100);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error generating answer:", error);
        }
      }
    };

    const processBatch = async (batch: Question[]) => {
      await Promise.all(
        batch.map(async (question) => {
          while (isPaused && !newController.signal.aborted) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
          if (!newController.signal.aborted) {
            await processQuestion(question);
          }
        })
      );
    };

    const batchSize = Math.min(5, questionsToAnswer.length); // Make this dynamic based on the number of questions to answer

    try {
      for (let i = 0; i < questionsToAnswer.length; i += batchSize) {
        if (newController.signal.aborted) break;
        const batch = questionsToAnswer.slice(i, i + batchSize);
        await processBatch(batch);
      }
    } catch (error) {
      console.error("Error processing questions:", error);
    } finally {
      if (!newController.signal.aborted) {
        setEditedAnswers(newEditedAnswers);
        setAiAnswers(newAiAnswers);
      }
      setIsAnsweringAll(false);
      setProgress(0);
      setController(null);
      setSelectedQuestions([]); // Clear selection after processing
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    controller?.abort();
    setIsAnsweringAll(false);
    setProgress(0);
    setController(null);
    setProcessedQuestions(0);
    setTotalQuestions(0);
  };

  const getStagedQuestions = () => stagedChanges;

  const getAllChanges = () => {
    return editedAnswers.filter(
      (ea) =>
        ea.answer !== ea.originalAnswer &&
        !stagedChanges.some((sc) => sc.id === ea.id) &&
        !shouldIgnoreAnswer(ea.answer)
    );
  };

  const handleStageChanges = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (question && !shouldIgnoreAnswer(question.answer.text || "")) {
      setStagedChanges((prev) => {
        const existingIndex = prev.findIndex((sc) => sc.id === id);
        if (existingIndex >= 0) {
          return prev.filter((sc) => sc.id !== id);
        } else {
          return [
            ...prev,
            {
              id: question.id,
              question: question.question,
              answer: question.answer.text || "",
            },
          ];
        }
      });
    }
  };

  const handleSelectQuestions = (questionIds: number[]) => {
    setSelectedQuestions((prev) => {
      const newSelection = new Set(prev);
      questionIds.forEach((id) => {
        if (newSelection.has(id)) {
          newSelection.delete(id);
        } else {
          newSelection.add(id);
        }
      });
      return Array.from(newSelection);
    });
  };

  const handleGroupAnswerSettings = (settings: GroupAnswerSettings) => {
    setGroupAnswerSettings(settings);
  };

  const handleStageAllChanges = () => {
    const changedQuestions = questions.filter(
      (q) => q.isEdited && !stagedChanges.some((sc) => sc.id === q.id) && !shouldIgnoreAnswer(q.answer.text || "")
    );
    setStagedChanges((prev) => [
      ...prev,
      ...changedQuestions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer.text || "",
      })),
    ]);
  };

  //   return (
  //     <>
  //       {isLoading ? (
  //         <div className="col-span-4 h-full flex justify-center items-center">
  //           <Loader className="animate-spin h-8 w-8 text-gray-500" />
  //         </div>
  //       ) : (
  //         <div className="col-span-4">
  //           {isAnsweringAll && (
  //             <div className="mb-6 flex items-center space-x-4">
  //               <Progress value={progress} className="w-full" />
  //               <Button onClick={handlePauseResume} size="sm">
  //                 {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
  //               </Button>
  //               <Button onClick={handleStop} size="sm">
  //                 <Square className="h-4 w-4" />
  //               </Button>
  //             </div>
  //           )}

  //           <div className="mb-6 flex space-x-4 "></div>
  //         </div>
  //       )}
  //       {!isLoading && totalPages > 1 && (
  //         <div className="mt-8">
  //           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
  //         </div>
  //       )}
  //     </>
  //   );
  // }

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <header className="top-0 z-10 flex h-[60px] flex-shrink-0 items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-medium">{currentProject ? currentProject.name : "Project"}</h1>
      </header>
      <main className="flex-grow overflow-hidden">
        <div className="col-span-6 grid grid-cols-6 h-full bg-background">
          <div className="col-span-2 border-r h-full border-border overflow-y-auto flex flex-col">
            <Tabs defaultValue="all" className="flex flex-col h-full">
              <div className="flex-shrink-0">
                <div className="flex items-center px-4 py-2">
                  <TabsList className="">
                    <TabsTrigger
                      disabled={isLoading || isAnsweringAll}
                      value="all"
                      className="text-zinc-600 dark:text-zinc-200">
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      disabled={isLoading || isAnsweringAll}
                      value="unread"
                      className="text-zinc-600 dark:text-zinc-200">
                      Empty
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2 ml-auto">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            disabled={isLoading || isAnsweringAll}
                            variant="ghost"
                            size="icon"
                            onClick={handleSelectAll}>
                            <Lasso className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select all</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Separator orientation="vertical" className="mx-2 h-6" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <GroupAnswerSettings
                            disabled={isLoading || isAnsweringAll || selectedQuestions.length === 0}
                            onSettingsChange={handleGroupAnswerSettings}
                            onExecute={handleAnswerAllQuestions}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate answers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <Separator />
                <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search"
                        className="pl-8"
                        disabled={isLoading || isAnsweringAll}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {isAnsweringAll && (
                        <div className="fixed z-50 bottom-4 right-4 bg-background border border-muted rounded-lg p-4 shadow-lg">
                          <div className="mb-2 flex items-center space-x-4">
                            <Progress value={progress} className="w-40 h-[3px]" />
                            <Button onClick={handlePauseResume} size="xs">
                              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-3 w-3" />}
                            </Button>
                            <Button onClick={handleStop} size="xs">
                              <Square className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Generating answers...({processedQuestions} / {totalQuestions})
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <TabsContent value="all" className="flex-grow overflow-auto">
                <QuestionList
                  items={filteredQuestions}
                  selectedId={Number(mail.selected)}
                  selectedQuestions={selectedQuestions}
                  onSelectQuestion={handleSelectQuestion}
                  onSelectQuestions={handleSelectQuestions}
                  isGenerating={isAnsweringAll}
                  editedAnswers={editedAnswers}
                  aiAnswers={aiAnswers}
                />
              </TabsContent>
              <TabsContent value="unread" className="flex-grow overflow-auto">
                <QuestionList
                  items={filteredQuestions.filter((item) => !item.answer.text)}
                  selectedId={Number(mail.selected)}
                  selectedQuestions={selectedQuestions}
                  onSelectQuestion={handleSelectQuestion}
                  onSelectQuestions={handleSelectQuestions}
                  isGenerating={isAnsweringAll}
                  editedAnswers={editedAnswers}
                  aiAnswers={aiAnswers}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-3 gap-4 h-full border-r border-muted overflow-hidden">
            <MessageDisplay
              item={questions.find((q) => q.id === Number(mail.selected)) || null}
              onAnswerChange={handleAnswerChange}
              aiAnswer={aiAnswers[Number(mail.selected)]}
              editedAnswers={editedAnswers}
              isGenerating={isAnsweringAll}
              onGenerateAnswer={() => {}}
            />
          </div>
          <div className="col-span-1 h-full flex flex-col gap-4 border-r border-muted overflow-hidden">
            <SectionsNav projectId={params.project_id} onSectionSelect={handleSectionSelect} />
            <div
              className="flex-col items-start gap-8 flex-grow flex col-span-3 border-t p-4 border-muted"
              x-chunk="dashboard-03-chunk-0">
              <div className="w-full space-y-2">
                <Input
                  placeholder="Commit message"
                  disabled={isCommitting || stagedChanges.length === 0}
                  className="placeholder:text-muted-foreground"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                />
                <Button
                  variant="success"
                  onClick={handleCommitChanges}
                  disabled={isLoading || isCommitting || stagedChanges.length === 0 || !commitMessage.trim()}
                  className="transition-colors w-full relative overflow-hidden">
                  {isCommitting ? (
                    <div className="flex items-center justify-center">
                      <Loader className="animate-spin h-4 w-4 mr-2" /> Committing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" /> Commit
                    </div>
                  )}
                  {isCommitting && (
                    <animated.div className="w-full h-[2px] mt-1 absolute bottom-0 left-0 bg-muted">
                      <animated.div
                        className="h-full bg-success"
                        style={{ width: animatedProgress.value.to((v) => `${v}%`) }}
                      />
                    </animated.div>
                    // <Progress value={commitProgress} className="absolute bottom-0 left-0 w-full h-[2px]" />
                  )}
                </Button>

                {getStagedQuestions().length > 0 && (
                  <>
                    <div className="w-full flex items-center justify-between mb-2 group  px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="xs"
                          disabled={isLoading || isCommitting}
                          className="flex items-center hover:bg-muted"
                          onClick={() => setIsStagedChangesOpen(!isStagedChangesOpen)}>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isStagedChangesOpen ? "" : "-rotate-90 transform"
                            }`}
                          />
                        </Button>
                        <h2 className="text-sm font-semibold">Staged Changes</h2>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="xs"
                                variant="outline"
                                disabled={isLoading || isCommitting}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStagedChanges([]);
                                }}>
                                <Minus className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Unstage all changes</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className="bg-muted text-xs rounded-full px-2">{getStagedQuestions().length}</div>
                      </div>
                    </div>

                    {isStagedChangesOpen && (
                      <ScrollArea className="max-h-[800px]">
                        {getStagedQuestions().map((stagedChange) => (
                          <div key={stagedChange.id} className="">
                            <div
                              className={`flex items-center relative justify-between group hover:bg-muted px-4 py-2 w-full cursor-pointer
                        }`}
                              onClick={() => handleItemClick(stagedChange.id)}>
                              <div className="flex items-center">
                                <div className="text-sm max-w-[200px] truncate overflow-hidden items-center leading-none transition-all duration-200 ease-in-out">
                                  <span className="text-xs text-ellipsis">{stagedChange.question}</span>
                                </div>
                              </div>

                              <div className="opacity-0 right-2 absolute group-hover:opacity-100 transition-opacity duration-200 ease-in-out flex items-center space-x-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="xs"
                                        disabled={isLoading || isCommitting}
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setStagedChanges((prev) => prev.filter((sc) => sc.id !== stagedChange.id));
                                        }}>
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Unstage changes</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    )}
                  </>
                )}

                <>
                  <div className="w-full flex rounded-none items-center justify-between mb-2 group px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setIsChangesOpen(!isChangesOpen)}
                        disabled={getAllChanges().length === 0}>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isChangesOpen ? "" : "-rotate-90 transform"
                          }`}
                        />
                      </Button>
                      <h2 className="text-sm font-semibold">Changes</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getAllChanges().length > 0 && (
                        <div className="flex items-center space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="xs"
                                  variant="outline"
                                  disabled={isLoading || isCommitting}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDiscardAllChanges();
                                  }}>
                                  <Minus className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Discard all changes</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="xs"
                                  variant="outline"
                                  disabled={isLoading || isCommitting}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStageAllChanges();
                                  }}>
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Stage all changes</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                      <div className="bg-muted text-xs rounded-full px-2">{getAllChanges().length}</div>
                    </div>
                  </div>

                  {isChangesOpen && (
                    <ScrollArea className="max-h-[800px]">
                      {getAllChanges().map((editedAnswer) => (
                        <div key={editedAnswer.id} className="">
                          <div
                            className={`flex items-center relative justify-between group hover:bg-muted px-4 py-2 cursor-pointer ${
                              shouldIgnoreAnswer(editedAnswer.answer) ? "opacity-50" : ""
                            }`}
                            onClick={() => handleItemClick(editedAnswer.id)}>
                            <div className="flex items-center rounded-md">
                              {/* <FileText className="h-4 w-4 text-gray-500 mr-2" /> */}

                              <div className="text-sm max-w-[250px] truncate overflow-hidden inline-flex items-center leading-none transition-all duration-200 ease-in-out">
                                {shouldIgnoreAnswer(editedAnswer.answer) ? (
                                  <Badge variant="destructive" size="xs" className="text-xs text-white mr-1">
                                    <TriangleAlert className="h-3 w-3" />
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" size="xs" className="text-xs mr-1">
                                    <Check className="h-3 w-3" />
                                  </Badge>
                                )}
                                <span className="text-xs text-ellipsis">{editedAnswer.question}</span>
                              </div>
                            </div>
                            {!shouldIgnoreAnswer(editedAnswer.answer) && (
                              <div className="opacity-0 absolute right-2 group-hover:opacity-100 transition-opacity duration-200 ease-in-out flex items-center space-x-2 flex-row">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="xs"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDiscardAllChanges(editedAnswer.id);
                                        }}
                                        disabled={isLoading}>
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Discard all changes</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="xs"
                                        variant="outline"
                                        onClick={() => handleStageChanges(editedAnswer.id)}>
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Stage changes</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
