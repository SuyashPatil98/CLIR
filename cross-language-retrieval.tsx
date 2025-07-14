"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, ArrowRightLeft, Globe, Clock, ExternalLink } from "lucide-react"

const mockResults = [
  {
    id: 1,
    title: "Künstliche Intelligenz in der Medizin",
    description:
      "Ein umfassender Überblick über die Anwendung von KI-Technologien in der modernen Medizin, einschließlich Diagnose, Behandlung und Patientenversorgung.",
    source: "Deutsches Ärzteblatt",
    relevance: 0.94,
    url: "#",
    tags: ["KI", "Medizin", "Technologie"],
  },
  {
    id: 2,
    title: "Maschinelles Lernen für medizinische Bildgebung",
    description:
      "Fortschritte bei der Verwendung von Deep Learning-Algorithmen zur Analyse medizinischer Bilder wie Röntgenaufnahmen, MRT-Scans und CT-Scans.",
    source: "Medizinische Informatik Journal",
    relevance: 0.89,
    url: "#",
    tags: ["Deep Learning", "Bildgebung", "Diagnostik"],
  },
  {
    id: 3,
    title: "Ethische Aspekte der KI im Gesundheitswesen",
    description:
      "Diskussion über die ethischen Herausforderungen und Überlegungen beim Einsatz künstlicher Intelligenz in medizinischen Anwendungen.",
    source: "Bioethik Quarterly",
    relevance: 0.82,
    url: "#",
    tags: ["Ethik", "Gesundheitswesen", "KI-Regulierung"],
  },
]

const translatedResults = [
  {
    id: 1,
    title: "Artificial Intelligence in Medicine",
    description:
      "A comprehensive overview of the application of AI technologies in modern medicine, including diagnosis, treatment, and patient care.",
    source: "German Medical Journal",
    relevance: 0.94,
    url: "#",
    tags: ["AI", "Medicine", "Technology"],
    translationConfidence: 0.96,
  },
  {
    id: 2,
    title: "Machine Learning for Medical Imaging",
    description:
      "Advances in using deep learning algorithms to analyze medical images such as X-rays, MRI scans, and CT scans.",
    source: "Medical Informatics Journal",
    relevance: 0.89,
    url: "#",
    tags: ["Deep Learning", "Imaging", "Diagnostics"],
    translationConfidence: 0.93,
  },
  {
    id: 3,
    title: "Ethical Aspects of AI in Healthcare",
    description:
      "Discussion of ethical challenges and considerations when deploying artificial intelligence in medical applications.",
    source: "Bioethics Quarterly",
    relevance: 0.82,
    url: "#",
    tags: ["Ethics", "Healthcare", "AI Regulation"],
    translationConfidence: 0.91,
  },
]

const translationSteps = [
  { step: 1, label: "Language Detection", description: "Identifying German text segments" },
  { step: 2, label: "Semantic Analysis", description: "Analyzing context and meaning" },
  { step: 3, label: "Neural Translation", description: "Applying transformer models" },
  { step: 4, label: "Quality Assessment", description: "Validating translation accuracy" },
  { step: 5, label: "Post-processing", description: "Formatting and optimization" },
]

export default function Component() {
  const [query, setQuery] = useState("artificial intelligence in medicine")
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(true)
  const [sourceLanguage, setSourceLanguage] = useState("EN")
  const [targetLanguage, setTargetLanguage] = useState("DE")
  const [showTranslation, setShowTranslation] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationStep, setTranslationStep] = useState(0)
  const [viewMode, setViewMode] = useState<"german" | "english" | "side-by-side">("german")

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
    }, 1500)
  }

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
  }

  const handleTranslation = async () => {
    setIsTranslating(true)
    setTranslationStep(0)

    // Simulate translation process
    for (let i = 0; i < translationSteps.length; i++) {
      setTranslationStep(i + 1)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    setIsTranslating(false)
    setShowTranslation(true)
    setViewMode("side-by-side")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">CrossLing Search</h1>
          </div>
          <p className="text-gray-600 text-lg">Cross-Language Information Retrieval Demo</p>
          <p className="text-sm text-gray-500 mt-2">Search in English, discover German content</p>
        </div>

        {/* Search Interface */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Query
            </CardTitle>
            <CardDescription>Enter your search query in English to find relevant German documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Language Selection */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  {sourceLanguage === "EN" ? "🇺🇸 English" : "🇩🇪 Deutsch"}
                </Badge>
                <Button variant="ghost" size="sm" onClick={swapLanguages} className="p-2">
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>
                <Badge variant="outline" className="px-3 py-1">
                  {targetLanguage === "DE" ? "🇩🇪 Deutsch" : "🇺🇸 English"}
                </Badge>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Enter your search query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-lg"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isSearching || !query.trim()} className="px-6">
                {isSearching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Example Queries */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Try:</span>
              {["climate change research", "renewable energy technology", "machine learning applications"].map(
                (example) => (
                  <Button
                    key={example}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6 px-2 text-blue-600 hover:text-blue-800"
                    onClick={() => setQuery(example)}
                  >
                    {example}
                  </Button>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Translation Process */}
        {hasSearched && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5" />
                Translation Pipeline
              </CardTitle>
              <CardDescription>
                Translate German results back to English using neural machine translation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showTranslation && !isTranslating && (
                <Button onClick={handleTranslation} className="w-full" size="lg">
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Translate Results to English
                </Button>
              )}

              {isTranslating && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-lg font-semibold text-blue-600 mb-2">Translation in Progress...</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(translationStep / translationSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {translationSteps.map((step, index) => (
                      <div
                        key={step.step}
                        className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                          index < translationStep
                            ? "bg-green-50 border-green-200 text-green-800"
                            : index === translationStep - 1
                              ? "bg-blue-50 border-blue-200 text-blue-800 animate-pulse"
                              : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      >
                        <div className="font-semibold text-sm">{step.label}</div>
                        <div className="text-xs mt-1">{step.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showTranslation && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-semibold">Translation Complete</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "german" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("german")}
                      >
                        🇩🇪 German
                      </Button>
                      <Button
                        variant={viewMode === "english" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("english")}
                      >
                        🇺🇸 English
                      </Button>
                      <Button
                        variant={viewMode === "side-by-side" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("side-by-side")}
                      >
                        Side-by-Side
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {showTranslation ? "Search Results with Translation" : "Search Results"}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Search completed in 0.34 seconds</span>
                {showTranslation && <span>• Translation: 4.2 seconds</span>}
              </div>
            </div>

            <div className="space-y-4">
              {mockResults.map((result, index) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {viewMode === "side-by-side" && showTranslation ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* German Version */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              🇩🇪 Original German
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-blue-700">{result.title}</h3>
                          <p className="text-gray-700 leading-relaxed">{result.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Source: {result.source}</span>
                          </div>
                        </div>

                        {/* English Translation */}
                        <div className="space-y-3 border-l pl-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              🇺🇸 English Translation
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {Math.round(translatedResults[index].translationConfidence * 100)}% confidence
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-green-700">{translatedResults[index].title}</h3>
                          <p className="text-gray-700 leading-relaxed">{translatedResults[index].description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Source: {translatedResults[index].source}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-blue-700 hover:text-blue-800 cursor-pointer">
                              {viewMode === "english" && showTranslation
                                ? translatedResults[index].title
                                : result.title}
                            </h3>
                            {showTranslation && (
                              <Badge variant="outline" className="text-xs">
                                {viewMode === "english" ? "🇺🇸 Translated" : "🇩🇪 Original"}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {Math.round(result.relevance * 100)}% match
                            </Badge>
                            {showTranslation && viewMode === "english" && (
                              <Badge variant="outline" className="text-xs">
                                {Math.round(translatedResults[index].translationConfidence * 100)}% translation
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm" className="p-1">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {viewMode === "english" && showTranslation
                            ? translatedResults[index].description
                            : result.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>
                              Source:{" "}
                              {viewMode === "english" && showTranslation
                                ? translatedResults[index].source
                                : result.source}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {(viewMode === "english" && showTranslation
                              ? translatedResults[index].tags
                              : result.tags
                            ).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="my-8" />

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-500">Results Found</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">0.34s</div>
                  <div className="text-sm text-gray-500">Search Time</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">94%</div>
                  <div className="text-sm text-gray-500">Best Match</div>
                </CardContent>
              </Card>
              {showTranslation && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">93%</div>
                    <div className="text-sm text-gray-500">Avg Translation</div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>CrossLing Search Demo - Powered by Advanced NLP & Information Retrieval</p>
        </div>
      </div>
    </div>
  )
}
