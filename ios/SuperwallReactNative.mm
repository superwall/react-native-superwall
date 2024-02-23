#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SuperwallReactNative, NSObject)

RCT_EXTERN_METHOD(
  configure:(NSString *)apiKey
  options:(NSDictionary *)options
  usingPurchaseController:(BOOL)usingPurchaseController
  withResolver:(RCTPromiseResolveBlock)resolve
  withRejecter:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  register:(NSString *)event
  params:(NSDictionary *)params
  handlerId:(NSString *)handlerId
  withResolver:(RCTPromiseResolveBlock)resolve
  withRejecter:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  identify:(NSString *)userId
  options:(NSDictionary *)options
)

RCT_EXTERN_METHOD(reset)

RCT_EXTERN_METHOD(setDelegate:(BOOL)isUndefined)

RCT_EXTERN_METHOD(
  getSubscriptionStatus:(RCTPromiseResolveBlock)resolve
  withRejecter:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(setSubscriptionStatus:(NSString *)status)

RCT_EXTERN_METHOD(didPurchase:(NSDictionary *)result)

RCT_EXTERN_METHOD(didRestore:(NSDictionary *)result)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
