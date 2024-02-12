export enum LocalNotificationType {
  TrialStarted = 'trialStarted',
}

export class LocalNotificationTypeUtils {
  static fromJson(value: string): LocalNotificationType {
    switch (value) {
      case 'trialStarted':
        return LocalNotificationType.TrialStarted;
      default:
        throw new Error(`Invalid LocalNotificationType value: ${value}`);
    }
  }

  static toJson(type: LocalNotificationType): string {
    switch (type) {
      case LocalNotificationType.TrialStarted:
        return 'trialStarted';
      default:
        throw new Error(`Invalid LocalNotificationType value`);
    }
  }
}

export class LocalNotification {
  type: LocalNotificationType;
  title: string;
  subtitle?: string;
  body: string;
  delay: number;

  constructor({
    type,
    title,
    subtitle,
    body,
    delay,
  }: {
    type: LocalNotificationType;
    title: string;
    subtitle?: string;
    body: string;
    delay: number;
  }) {
    this.type = type;
    this.title = title;
    this.subtitle = subtitle;
    this.body = body;
    this.delay = delay;
  }

  static fromJson(json: { [key: string]: any }): LocalNotification {
    return new LocalNotification({
      type: LocalNotificationTypeUtils.fromJson(json.type),
      title: json.title,
      subtitle: json.subtitle,
      body: json.body,
      delay: json.delay,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      type: LocalNotificationTypeUtils.toJson(this.type),
      title: this.title,
      subtitle: this.subtitle,
      body: this.body,
      delay: this.delay,
    };
  }
}
