/**
 * @module Lights, Camera
 * @submodule Camera
 * @for p5
 * @requires core
 */

'use strict';

var p5 = require('../core/core');

/**
 * Sets camera position
 * @method camera
 * @param  {Number} x  camera position value on x axis
 * @param  {Number} y  camera position value on y axis
 * @param  {Number} z  camera position value on z axis
 * @return {p5}        the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw(){
 *  //move the camera away from the plane by a sin wave
 *  camera(0, 0, sin(frameCount * 0.01) * 100);
 *  plane(120, 120);
 * }
 * </code>
 * </div>
 *
 * @alt
 * blue square shrinks in size grows to fill canvas. disappears then loops.
 *
 */
p5.prototype.camera = function(x, y, z){
  //what it manipulates is the model view matrix
  this._renderer.translate(-x, -y, -z);
};

/**
 * Sets perspective camera
 * @method  perspective
 * @param  {Number} fovy   camera frustum vertical field of view,
 *                         from bottom to top of view, in degrees
 * @param  {Number} aspect camera frustum aspect ratio
 * @param  {Number} near   frustum near plane length
 * @param  {Number} far    frustum far plane length
 * @return {p5}            the p5 object
 * @example
 * <div>
 * <code>
 * //drag mouse to toggle the world!
 * //you will see there's a vanish point
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 *   var fov = 60 / 180 * PI;
 *   var cameraZ = (height/2.0) / tan(fov/2.0);
 *   perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);
 * }
 * function draw(){
 *  background(200);
 *  orbitControl();
 *  for(var i = -1; i < 2; i++){
 *     for(var j = -2; j < 3; j++){
 *       push();
 *       translate(i*160, 0, j*160);
 *       box(40, 40, 40);
 *       pop();
 *     }
 *   }
 * }
 * </code>
 * </div>
 *
 * @alt
 * colored 3d boxes toggleable with mouse position
 *
 */
p5.prototype.perspective = function(fovy,aspect,near,far) {
  fovy = fovy || (60 / 180 * this.PI);
  aspect = aspect || (this.width/this.height);
  near = near || ((this.height/2.0) / this.tan(fovy/2.0) * 0.1);
  far = far || ((this.height/2.0) / this.tan(fovy/2.0) * 10);
  this._renderer.uPMatrix = p5.Matrix.identity();
  this._renderer.uPMatrix.perspective(fovy,aspect,near,far);
  this._renderer._curCamera = 'custom';
};

/**
 * Setup ortho camera
 * @method  ortho
 * @param  {Number} left   camera frustum left plane
 * @param  {Number} right  camera frustum right plane
 * @param  {Number} bottom camera frustum bottom plane
 * @param  {Number} top    camera frustum top plane
 * @param  {Number} near   camera frustum near plane
 * @param  {Number} far    camera frustum far plane
 * @return {p5}            the p5 object
 * @example
 * <div>
 * <code>
 * //drag mouse to toggle the world!
 * //there's no vanish point
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 *   ortho(-width/2, width/2, height/2, -height/2, 0, 500);
 * }
 * function draw(){
 *  background(200);
 *  orbitControl();
 *  for(var i = -1; i < 2; i++){
 *     for(var j = -2; j < 3; j++){
 *       push();
 *       translate(i*160, 0, j*160);
 *       box(40, 40, 40);
 *       pop();
 *     }
 *   }
 * }
 * </code>
 * </div>
 *
 * @alt
 * 3 3d boxes, reveal several more boxes on 3d plane when mouse used to toggle
 *
 */
p5.prototype.ortho = function(left,right,bottom,top,near,far) {
  left = left || (-this.width/2);
  right = right || (this.width/2);
  bottom = bottom || (-this.height/2);
  top = top || (this.height/2);
  near = near || 0;
  far = far || Math.max(this.width, this.height);
  this._renderer.uPMatrix = p5.Matrix.identity();
  this._renderer.uPMatrix.ortho(left,right,bottom,top,near,far);
  this._renderer._curCamera = 'custom';
};

module.exports = p5;
