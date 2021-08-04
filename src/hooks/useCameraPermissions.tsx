import { AnyArray } from "immer/dist/internal";
import { useRef } from "react";
import { useState, useEffect, useLayoutEffect } from "react";

type DeviceTypeProps = "Browser" | "Mobile-Browser" | null;

interface useCameraPermissionsProps {
  device: DeviceTypeProps;
  hasPermission: boolean;
  ios: {
    cameraAccess: boolean;
  };
  android: {
    cameraAccess: boolean;
  };
  debugTools: {
    detectMethod: number;
    navigator: string;
    error: string;
  };
}

//issue with directly using uselayouteffect in nextjs
const canUseDOM = typeof window !== "undefined";
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

const useCameraPermissions = (): useCameraPermissionsProps => {
  const [hasPermission, setHasPermission] = useState(false);
  const [androidCamera, setAndroidCamera] = useState(false);
  const [iOSCamera, setIOSCamera] = useState(false);
  const [device, setDevice] = useState<DeviceTypeProps>(null);
  const [error, setError] = useState("");
  const [checkDevice, setCheckDevice] = useState(false);
  const isInitialRender = useRef(true);
  const [detectMethod, setDetectMethod] = useState(0);
  const [navigatorMethod, setNavigatorMethod] = useState("");
  const [hasNavigator, setHasNavigator] = useState(false);

  if (typeof window !== "undefined" && !hasNavigator) {
    setHasNavigator(true);
  }

  useIsomorphicLayoutEffect(() => {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      setDetectMethod(1);
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      setDetectMethod(2);
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      // @ts-ignore
      const mQ = window.matchMedia && matchMedia("(pointer:corase)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        setDetectMethod(3);
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        setDetectMethod(4);
        hasTouchScreen = true;
      } else {
        setDetectMethod(500);
        // if everything fail, fall back to agent sniffing
        const UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    if (hasTouchScreen) {
      return setDevice("Mobile-Browser");
    }

    return setDevice("Browser");
  }, []);

  // webkitgetusermedia for < 53 Chrome
  // mozGetuserMedai for < 36 FF
  // getUserMedia for < 41 Opera
  useEffect(() => {
    if (!hasNavigator) {
      return;
    }
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    let _temp = "";
    for (var i in navigator) {
      _temp += i + "         ";
    }

    alert(JSON.stringify(_temp));

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      "";
    alert(`getUserMedia: ${navigator.getUserMedia}`);
    try {
      if ("getUserMedia" in navigator && navigator.getUserMedia) {
        setNavigatorMethod("legacy");
        navigator.getUserMedia(
          { video: true },
          (success) => {
            setAndroidCamera(true);
          },
          (fail) => {
            setAndroidCamera(false);
            setError(fail.message!);
          }
        );
      } else if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia
      ) {
        alert(`mediaDevice: ${navigator.mediaDevices.getUserMedia}`);
        setNavigatorMethod("modern");
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(async (result) => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const camera = devices.filter(
              (device) => device.kind === "videoinput"
            );
            if (camera.length > 0) {
              setIOSCamera(true);
            } else {
              setIOSCamera(false);
              setError("IOS camera error");
            }
          })
          .catch((err) => {
            setIOSCamera(false);
            setError("IOS camera error");
          });
      } else {
        setError("no navigator method available");
      }
      setCheckDevice(true);
    } catch (error) {
      setNavigatorMethod("Failed both API check");
      setError(
        "This browser is not supported, please use a different browser..."
      );
    }
  }, [device, hasNavigator]);

  // split into another useEffect due to batching, previously unable to set permissions

  useEffect(() => {
    if (androidCamera || iOSCamera || device === "Browser") {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  }, [checkDevice, androidCamera, iOSCamera]);

  return {
    device,
    hasPermission: hasPermission,
    ios: { cameraAccess: iOSCamera },
    android: { cameraAccess: androidCamera },
    debugTools: {
      detectMethod,
      navigator: navigatorMethod,
      error: error,
    },
  };
};

export default useCameraPermissions;
