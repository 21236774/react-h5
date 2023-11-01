import { useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export default function Home () {
  const scene = new THREE.Scene() // 创建场景
  const geometry = new THREE.SphereGeometry(100, 100, 100);  // 创建一个球体

  const material = new THREE.MeshPhongMaterial({ // 创建一个材质
    color: '#318bb7',
    shininess: 20,
    antialias:true
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0,100,0)
  mesh.scale.x = -1
  scene.add(mesh);

  // ground 地面
  const ground = new THREE.Mesh( new THREE.PlaneGeometry( 5000, 5000 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
  ground.rotation.x = - Math.PI / 2;
  ground.receiveShadow = true;
  scene.add( ground );

  // 添加网格
  const grid = new THREE.GridHelper( 5000, 20, 0x000000, 0x000000 );
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add( grid );


  // 定义相机输出画布的尺寸(单位:像素px)
  const width = 350; //宽度
  const height = 350; //高度
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

  const x = 800, y = 800, z=100;
  camera.position.set(x,y,z)
  camera.lookAt(mesh.position);//指向mesh对应的位置

  const pointLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d );
  pointLight.position.set(1000, 1000, 100)
  scene.add(pointLight)

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
  renderer.render(scene, camera); //执行渲染操作

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  // OrbitControls本质上就是改变相机的参数，比如相机的位置属性，改变相机位置也可以改变相机拍照场景中模型的角度，实现模型的360度旋转预览效果
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });

  useEffect(() => {
    document.getElementById('geometry-webgl')?.appendChild(renderer.domElement);
  }, [])
  return (
    <div>
      <div id="geometry-webgl"></div>
      <div>首页</div>
    </div>
  )
}