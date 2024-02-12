/// A wrapper around a store product.
export class StoreProduct {
  // The product identifier
  productIdentifier: string;

  // The localized price.
  localizedPrice: string;

  // The localized subscription period.
  localizedSubscriptionPeriod: string;

  // The subscription period unit, e.g., week.
  period: string;

  // The number of weeks in the product's subscription period.
  periodWeeks: number;

  // The string value of the number of weeks in the product's subscription period.
  periodWeeksString: string;

  // The number of months in the product's subscription period.
  periodMonths: number;

  // The string value of the number of months in the product's subscription period.
  periodMonthsString: string;

  // The number of years in the product's subscription period.
  periodYears: number;

  // The string value of the number of years in the product's subscription period.
  periodYearsString: string;

  // The number of days in the product's subscription period.
  periodDays: number;

  // The string value of the number of days in the product's subscription period.
  periodDaysString: string;

  // The product's localized daily price.
  dailyPrice: string;

  // The product's localized weekly price.
  weeklyPrice: string;

  // The product's localized monthly price.
  monthlyPrice: string;

  // The product's localized yearly price.
  yearlyPrice: string;

  // A boolean indicating whether the product has an introductory price.
  hasFreeTrial: boolean;

  // The product's trial period end date.
  trialPeriodEndDate?: Date | null;

  // The product's trial period end date formatted using `DateFormatter.Style.medium`
  trialPeriodEndDateString: string;

  // The product's introductory price duration in days.
  localizedTrialPeriodPrice: string;

  // The product's introductory price duration in days.
  trialPeriodPrice: number;

  // The product's introductory price duration in days.
  trialPeriodDays: number;

  // The product's string value of the introductory price duration in days.
  trialPeriodDaysString: string;

  // The product's introductory price duration in weeks.
  trialPeriodWeeks: number;

  // The product's string value of the introductory price duration in weeks.
  trialPeriodWeeksString: string;

  // The product's introductory price duration in months.
  trialPeriodMonths: number;

  // The product's string value of the introductory price duration in months.
  trialPeriodMonthsString: string;

  // The product's introductory price duration in years.
  trialPeriodYears: number;

  // The product's string value of the introductory price duration in years.
  trialPeriodYearsString: string;

  // The product's introductory price duration in days, e.g., 7-day.
  trialPeriodText: string;

  // The product's locale.
  locale: string;

  // The language code of the product's locale.
  languageCode?: string | null;

  // The currency code of the product's locale.
  currencyCode?: string | null;

  // The currency symbol of the product's locale.
  currencySymbol?: string | null;

  // A boolean that indicates whether the product is family shareable.
  isFamilyShareable: boolean;

  // The region code of the product's price locale.
  regionCode?: string | null;

  // The price of the product in the local currency.
  price: number;

  constructor({
    productIdentifier,
    localizedPrice,
    localizedSubscriptionPeriod,
    period,
    periodWeeks,
    periodWeeksString,
    periodMonths,
    periodMonthsString,
    periodYears,
    periodYearsString,
    periodDays,
    periodDaysString,
    dailyPrice,
    weeklyPrice,
    monthlyPrice,
    yearlyPrice,
    hasFreeTrial,
    trialPeriodEndDate,
    trialPeriodEndDateString,
    localizedTrialPeriodPrice,
    trialPeriodPrice,
    trialPeriodDays,
    trialPeriodDaysString,
    trialPeriodWeeks,
    trialPeriodWeeksString,
    trialPeriodMonths,
    trialPeriodMonthsString,
    trialPeriodYears,
    trialPeriodYearsString,
    trialPeriodText,
    locale,
    languageCode,
    currencyCode,
    currencySymbol,
    isFamilyShareable,
    regionCode,
    price,
  }: {
    productIdentifier: string;
    localizedPrice: string;
    localizedSubscriptionPeriod: string;
    period: string;
    periodWeeks: number;
    periodWeeksString: string;
    periodMonths: number;
    periodMonthsString: string;
    periodYears: number;
    periodYearsString: string;
    periodDays: number;
    periodDaysString: string;
    dailyPrice: string;
    weeklyPrice: string;
    monthlyPrice: string;
    yearlyPrice: string;
    hasFreeTrial: boolean;
    trialPeriodEndDate?: Date | null;
    trialPeriodEndDateString: string;
    localizedTrialPeriodPrice: string;
    trialPeriodPrice: number;
    trialPeriodDays: number;
    trialPeriodDaysString: string;
    trialPeriodWeeks: number;
    trialPeriodWeeksString: string;
    trialPeriodMonths: number;
    trialPeriodMonthsString: string;
    trialPeriodYears: number;
    trialPeriodYearsString: string;
    trialPeriodText: string;
    locale: string;
    languageCode?: string | null;
    currencyCode?: string | null;
    currencySymbol?: string | null;
    isFamilyShareable: boolean;
    regionCode?: string | null;
    price: number;
  }) {
    this.productIdentifier = productIdentifier;
    this.localizedPrice = localizedPrice;
    this.localizedSubscriptionPeriod = localizedSubscriptionPeriod;
    this.period = period;
    this.periodWeeks = periodWeeks;
    this.periodWeeksString = periodWeeksString;
    this.periodMonths = periodMonths;
    this.periodMonthsString = periodMonthsString;
    this.periodYears = periodYears;
    this.periodYearsString = periodYearsString;
    this.periodDays = periodDays;
    this.periodDaysString = periodDaysString;
    this.dailyPrice = dailyPrice;
    this.weeklyPrice = weeklyPrice;
    this.monthlyPrice = monthlyPrice;
    this.yearlyPrice = yearlyPrice;
    this.hasFreeTrial = hasFreeTrial;
    this.trialPeriodEndDate = trialPeriodEndDate;
    this.trialPeriodEndDateString = trialPeriodEndDateString;
    this.localizedTrialPeriodPrice = localizedTrialPeriodPrice;
    this.trialPeriodPrice = trialPeriodPrice;
    this.trialPeriodDays = trialPeriodDays;
    this.trialPeriodDaysString = trialPeriodDaysString;
    this.trialPeriodWeeks = trialPeriodWeeks;
    this.trialPeriodWeeksString = trialPeriodWeeksString;
    this.trialPeriodMonths = trialPeriodMonths;
    this.trialPeriodMonthsString = trialPeriodMonthsString;
    this.trialPeriodYears = trialPeriodYears;
    this.trialPeriodYearsString = trialPeriodYearsString;
    this.trialPeriodText = trialPeriodText;
    this.locale = locale;
    this.languageCode = languageCode;
    this.currencyCode = currencyCode;
    this.currencySymbol = currencySymbol;
    this.isFamilyShareable = isFamilyShareable;
    this.regionCode = regionCode;
    this.price = price;
  }

  static fromJson(json: any): StoreProduct {
    return new StoreProduct({
      productIdentifier: json.productIdentifier,
      localizedPrice: json.localizedPrice,
      localizedSubscriptionPeriod: json.localizedSubscriptionPeriod,
      period: json.period,
      periodWeeks: json.periodWeeks,
      periodWeeksString: json.periodWeeksString,
      periodMonths: json.periodMonths,
      periodMonthsString: json.periodMonthsString,
      periodYears: json.periodYears,
      periodYearsString: json.periodYearsString,
      periodDays: json.periodDays,
      periodDaysString: json.periodDaysString,
      dailyPrice: json.dailyPrice,
      weeklyPrice: json.weeklyPrice,
      monthlyPrice: json.monthlyPrice,
      yearlyPrice: json.yearlyPrice,
      hasFreeTrial: json.hasFreeTrial,
      trialPeriodEndDate: json.trialPeriodEndDate
        ? new Date(json.trialPeriodEndDate)
        : null,
      trialPeriodEndDateString: json.trialPeriodEndDateString,
      localizedTrialPeriodPrice: json.localizedTrialPeriodPrice,
      trialPeriodPrice: json.trialPeriodPrice,
      trialPeriodDays: json.trialPeriodDays,
      trialPeriodDaysString: json.trialPeriodDaysString,
      trialPeriodWeeks: json.trialPeriodWeeks,
      trialPeriodWeeksString: json.trialPeriodWeeksString,
      trialPeriodMonths: json.trialPeriodMonths,
      trialPeriodMonthsString: json.trialPeriodMonthsString,
      trialPeriodYears: json.trialPeriodYears,
      trialPeriodYearsString: json.trialPeriodYearsString,
      trialPeriodText: json.trialPeriodText,
      locale: json.locale,
      languageCode: json.languageCode || null,
      currencyCode: json.currencyCode || null,
      currencySymbol: json.currencySymbol || null,
      isFamilyShareable: json.isFamilyShareable ?? false,
      regionCode: json.regionCode || null,
      price: json.price,
    });
  }
}
