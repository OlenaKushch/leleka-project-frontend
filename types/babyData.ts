export interface BabyData {
  weekNumber: number
  image: string
  imageAlt: string
  babyActivity: string
  babyDevelopment: string
}

export interface WeekData extends BabyData {
  daysToMeeting: number
  babySize: number
  babyWeight: number
  momDailyTips: string[]
}

export interface BabyInfo extends BabyData {
  analogy: string
  babySize: number
  babyWeight: number
  interestingFact: string
}

export interface ComfortTip {
  category: 'Харчування' | 'Активність' | 'Відпочинок та комфорт'
  tip: string
}

export interface MomInfo {
  weekNumber: number
  feelings: {
    states: string[]
    sensationDescr: string
  }
  comfortTips: ComfortTip[]
}
