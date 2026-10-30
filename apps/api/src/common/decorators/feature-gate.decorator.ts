import { SetMetadata } from '@nestjs/common';

export const FEATURE_GATE_KEY = 'feature_gate';
export const FeatureGate = (featureName: string) => SetMetadata(FEATURE_GATE_KEY, featureName);
