import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

interface AvatarOptions {
  modelPath: string;
  animationPaths?: string[];
  enableControls?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableShadows?: boolean;
  cameraPosition?: [number, number, number];
  lightIntensity?: number;
  backgroundColor?: string;
}

interface AvatarInstance {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  model: THREE.Group | null;
  mixer: THREE.AnimationMixer | null;
  controls: OrbitControls | null;
  playAnimation: (index: number) => void;
  stopAnimation: () => void;
  setRotation: (x: number, y: number, z: number) => void;
  setPosition: (x: number, y: number, z: number) => void;
  dispose: () => void;
  isLoading?: boolean;
  error?: string | null;
}

// Helper function to create animation handlers
function createAnimationHandlers(
  mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>,
  animationsRef: React.MutableRefObject<THREE.AnimationClip[]>,
  currentActionRef: React.MutableRefObject<THREE.AnimationAction | null>
) {
  const playAnimation = (index: number) => {
    if (mixerRef.current && animationsRef.current[index]) {
      if (currentActionRef.current) {
        currentActionRef.current.fadeOut(0.5);
      }
      const action = mixerRef.current.clipAction(animationsRef.current[index]);
      action.reset().fadeIn(0.5).play();
      currentActionRef.current = action;
    }
  };

  const stopAnimation = () => {
    if (currentActionRef.current) {
      currentActionRef.current.fadeOut(0.5);
      currentActionRef.current = null;
    }
  };

  return { playAnimation, stopAnimation };
}

// Helper function to create model transform handlers
function createModelHandlers(
  modelRef: React.MutableRefObject<THREE.Group | null>
) {
  const setRotation = (x: number, y: number, z: number) => {
    if (modelRef.current) {
      modelRef.current.rotation.set(x, y, z);
    }
  };

  const setPosition = (x: number, y: number, z: number) => {
    if (modelRef.current) {
      modelRef.current.position.set(x, y, z);
    }
  };

  return { setRotation, setPosition };
}

// Helper hook for avatar refs
function useAvatarRefs() {
  return {
    sceneRef: useRef<THREE.Scene | null>(null),
    cameraRef: useRef<THREE.PerspectiveCamera | null>(null),
    rendererRef: useRef<THREE.WebGLRenderer | null>(null),
    modelRef: useRef<THREE.Group | null>(null),
    mixerRef: useRef<THREE.AnimationMixer | null>(null),
    controlsRef: useRef<OrbitControls | null>(null),
    animationsRef: useRef<THREE.AnimationClip[]>([]),
    currentActionRef: useRef<THREE.AnimationAction | null>(null),
    frameIdRef: useRef<number | null>(null),
  };
}

// Helper hook for avatar initialization
function useAvatarInitialization(
  containerRef: React.RefObject<HTMLDivElement>,
  options: AvatarOptions,
  refs: ReturnType<typeof useAvatarRefs>,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  dispose: () => void
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const cleanup = initializeAvatar(
      containerRef.current, options,
      refs.sceneRef, refs.cameraRef, refs.rendererRef, refs.controlsRef,
      refs.modelRef, refs.mixerRef, refs.animationsRef, refs.currentActionRef,
      refs.frameIdRef, setIsLoading, setError, dispose
    );

    return cleanup;
  }, [containerRef, options, dispose, refs]);
}

export const useAvatar = (
  containerRef: React.RefObject<HTMLDivElement>,
  options: AvatarOptions
): AvatarInstance => {
  const refs = useAvatarRefs();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create handlers
  const { playAnimation, stopAnimation } = useMemo(
    () => createAnimationHandlers(refs.mixerRef, refs.animationsRef, refs.currentActionRef),
    []
  );
  
  const { setRotation, setPosition } = useMemo(
    () => createModelHandlers(refs.modelRef),
    []
  );

  // Dispose all resources
  const dispose = useCallback(() => {
    disposeResources(
      refs.frameIdRef, refs.controlsRef, refs.rendererRef, refs.modelRef,
      refs.sceneRef, refs.cameraRef, refs.mixerRef, refs.animationsRef,
      refs.currentActionRef
    );
  }, [refs]);

  // Initialize avatar
  useAvatarInitialization(containerRef, options, refs, setIsLoading, setError, dispose);

  return {
    scene: refs.sceneRef.current,
    camera: refs.cameraRef.current,
    renderer: refs.rendererRef.current,
    model: refs.modelRef.current,
    mixer: refs.mixerRef.current,
    controls: refs.controlsRef.current,
    playAnimation,
    stopAnimation,
    setRotation,
    setPosition,
    dispose,
    isLoading,
    error,
  };
};

// Helper function to dispose resources
function disposeResources(
  frameIdRef: React.MutableRefObject<number | null>,
  controlsRef: React.MutableRefObject<OrbitControls | null>,
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>,
  modelRef: React.MutableRefObject<THREE.Group | null>,
  sceneRef: React.MutableRefObject<THREE.Scene | null>,
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>,
  mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>,
  animationsRef: React.MutableRefObject<THREE.AnimationClip[]>,
  currentActionRef: React.MutableRefObject<THREE.AnimationAction | null>
) {
  if (frameIdRef.current) {
    cancelAnimationFrame(frameIdRef.current);
  }

  if (controlsRef.current) {
    controlsRef.current.dispose();
  }

  if (rendererRef.current) {
    rendererRef.current.dispose();
  }

  if (modelRef.current) {
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(material => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }

  sceneRef.current = null;
  cameraRef.current = null;
  rendererRef.current = null;
  modelRef.current = null;
  mixerRef.current = null;
  controlsRef.current = null;
  animationsRef.current = [];
  currentActionRef.current = null;
}

// Helper function to setup scene
function setupScene(options: AvatarOptions): THREE.Scene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(options.backgroundColor || '#f0f0f0');
  return scene;
}

// Helper function to setup camera
function setupCamera(
  container: HTMLDivElement,
  options: AvatarOptions
): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const [camX, camY, camZ] = options.cameraPosition || [0, 1.5, 3];
  camera.position.set(camX, camY, camZ);
  return camera;
}

// Helper function to setup renderer
function setupRenderer(
  container: HTMLDivElement,
  options: AvatarOptions
): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  
  if (options.enableShadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  
  container.appendChild(renderer.domElement);
  return renderer;
}

// Helper function to setup lighting
function setupLighting(
  scene: THREE.Scene,
  options: AvatarOptions
) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    options.lightIntensity || 1
  );
  directionalLight.position.set(5, 10, 5);
  directionalLight.lookAt(0, 0, 0);
  
  if (options.enableShadows) {
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
  }
  
  scene.add(directionalLight);

  const fillLight = new THREE.DirectionalLight(0x4080ff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
}

// Helper function to setup controls
function setupControls(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  options: AvatarOptions
): OrbitControls | null {
  if (!options.enableControls) return null;
  
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.maxPolarAngle = Math.PI * 0.9;
  controls.autoRotate = options.autoRotate || false;
  controls.autoRotateSpeed = options.autoRotateSpeed || 2;
  return controls;
}

// Helper function to setup model
function setupModel(
  model: THREE.Group,
  options: AvatarOptions
) {
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (options.enableShadows) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      
      if (child.material && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 0.5;
        child.material.needsUpdate = true;
      }
    }
  });
}

// Helper function to center and scale model
function centerAndScaleModel(model: THREE.Group) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxDim;
  model.scale.multiplyScalar(scale);
  
  box.setFromObject(model);
  box.getCenter(center);
  model.position.sub(center);
  model.position.y = 0;
}

// Helper function to setup 3D environment
function setup3DEnvironment(
  container: HTMLDivElement,
  options: AvatarOptions,
  sceneRef: React.MutableRefObject<THREE.Scene | null>,
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>,
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>,
  controlsRef: React.MutableRefObject<OrbitControls | null>
) {
  const scene = setupScene(options);
  sceneRef.current = scene;

  const camera = setupCamera(container, options);
  cameraRef.current = camera;

  const renderer = setupRenderer(container, options);
  rendererRef.current = renderer;

  setupLighting(scene, options);
  
  const controls = setupControls(camera, renderer, options);
  controlsRef.current = controls;

  return { scene, camera, renderer, controls };
}

// Helper function to initialize avatar
function initializeAvatar(
  container: HTMLDivElement,
  options: AvatarOptions,
  sceneRef: React.MutableRefObject<THREE.Scene | null>,
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>,
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>,
  controlsRef: React.MutableRefObject<OrbitControls | null>,
  modelRef: React.MutableRefObject<THREE.Group | null>,
  mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>,
  animationsRef: React.MutableRefObject<THREE.AnimationClip[]>,
  currentActionRef: React.MutableRefObject<THREE.AnimationAction | null>,
  frameIdRef: React.MutableRefObject<number | null>,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  dispose: () => void
): () => void {
  const clock = new THREE.Clock();

  // Setup 3D environment
  const { scene, camera, renderer } = setup3DEnvironment(
    container, options, sceneRef, cameraRef, rendererRef, controlsRef
  );

  // Setup and load model
  const { gltfLoader } = setupModelLoader(setIsLoading, setError);
  loadModel(
    gltfLoader, options, scene, modelRef, mixerRef,
    animationsRef, currentActionRef, renderer, setError, setIsLoading
  );

  // Start animation loop
  const animate = createAnimationLoop(
    clock, mixerRef, controlsRef, renderer, scene, camera, frameIdRef
  );
  animate();

  // Setup resize handler
  const handleResize = createResizeHandler(container, camera, renderer);
  window.addEventListener('resize', handleResize);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    dispose();
    if (container && renderer) {
      container.removeChild(renderer.domElement);
    }
  };
}

// Helper function to setup model loader
function setupModelLoader(
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) {
  const loadingManager = new THREE.LoadingManager();
  
  loadingManager.onStart = () => setIsLoading(true);
  loadingManager.onLoad = () => setIsLoading(false);
  loadingManager.onError = (url) => {
    setError(`Failed to load: ${url}`);
    setIsLoading(false);
  };

  const gltfLoader = new GLTFLoader(loadingManager);
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  gltfLoader.setDRACOLoader(dracoLoader);

  return { gltfLoader, loadingManager };
}

// Helper function to load model
function loadModel(
  gltfLoader: GLTFLoader,
  options: AvatarOptions,
  scene: THREE.Scene,
  modelRef: React.MutableRefObject<THREE.Group | null>,
  mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>,
  animationsRef: React.MutableRefObject<THREE.AnimationClip[]>,
  currentActionRef: React.MutableRefObject<THREE.AnimationAction | null>,
  renderer: THREE.WebGLRenderer,
  setError: (error: string | null) => void,
  setIsLoading: (loading: boolean) => void
) {
  const handleModelLoad = createModelLoadHandler(
    scene,
    modelRef,
    mixerRef,
    animationsRef,
    currentActionRef,
    options,
    gltfLoader,
    renderer
  );
  
  gltfLoader.load(
    options.modelPath,
    handleModelLoad,
    (progress) => {
      const percentComplete = (progress.loaded / progress.total) * 100;
      console.log(`Loading: ${percentComplete.toFixed(2)}%`);
    },
    (error) => {
      console.error('Error loading model:', error);
      setError('Failed to load 3D model');
      setIsLoading(false);
    }
  );
}

// Helper function to create model load handler
function createModelLoadHandler(
  scene: THREE.Scene,
  modelRef: React.MutableRefObject<THREE.Group | null>,
  mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>,
  animationsRef: React.MutableRefObject<THREE.AnimationClip[]>,
  currentActionRef: React.MutableRefObject<THREE.AnimationAction | null>,
  options: AvatarOptions,
  gltfLoader: GLTFLoader,
  renderer: THREE.WebGLRenderer
) {
  return (gltf: { scene: THREE.Group; animations: THREE.AnimationClip[] }) => {
    const model = gltf.scene;
    modelRef.current = model;
    
    setupModel(model, options);
    centerAndScaleModel(model);
    scene.add(model);
    
    // Setup animations
    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;
      animationsRef.current = gltf.animations;
      
      if (gltf.animations[0]) {
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        currentActionRef.current = action;
      }
    }
    
    // Load additional animations
    loadAdditionalAnimations(
      options,
      gltfLoader,
      animationsRef
    );
    
    // Add ground plane
    if (options.enableShadows) {
      addGroundPlane(scene);
    }
    
    // Setup environment
    setupEnvironment(scene, renderer);
  };
}

// Helper function to load additional animations
function loadAdditionalAnimations(
  options: AvatarOptions,
  gltfLoader: GLTFLoader,
  animationsRef: React.MutableRefObject<THREE.AnimationClip[]>
) {
  if (!options.animationPaths || options.animationPaths.length === 0) return;
  
  Promise.all(
    options.animationPaths.map(path =>
      new Promise<THREE.AnimationClip[]>((resolve, reject) => {
        gltfLoader.load(
          path,
          (animGltf) => resolve(animGltf.animations),
          undefined,
          reject
        );
      })
    )
  ).then((animationsArray) => {
    const allAnimations = animationsArray.flat();
    animationsRef.current = [...animationsRef.current, ...allAnimations];
  }).catch((error) => {
    console.error('Failed to load animations:', error);
  });
}

// Helper function to add ground plane
function addGroundPlane(scene: THREE.Scene) {
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = 0;
  plane.receiveShadow = true;
  scene.add(plane);
}

// Helper function to setup environment
function setupEnvironment(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0xbfe3dd);
  const envTexture = pmremGenerator.fromScene(envScene).texture;
  scene.environment = envTexture;
  
  pmremGenerator.dispose();
}

// Helper function to create animation loop
function createAnimationLoop(
  clock: THREE.Clock,
  mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>,
  controlsRef: React.MutableRefObject<OrbitControls | null>,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  frameIdRef: React.MutableRefObject<number | null>
) {
  const animate = () => {
    frameIdRef.current = requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    
    renderer.render(scene, camera);
  };
  
  return animate;
}

// Helper function to create resize handler
function createResizeHandler(
  container: HTMLDivElement,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  return () => {
    if (!container || !camera || !renderer) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
}

export default useAvatar;