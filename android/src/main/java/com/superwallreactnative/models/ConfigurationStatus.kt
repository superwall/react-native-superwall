package com.superwallreactnative.models

import com.superwall.sdk.config.models.ConfigurationStatus

fun ConfigurationStatus.asString(): String {
    return when (this) {
        ConfigurationStatus.Pending -> "PENDING"
        ConfigurationStatus.Configured -> "CONFIGURED"
        ConfigurationStatus.Failed -> "FAILED"
    }
}
