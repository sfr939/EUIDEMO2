//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }

    private textField: egret.TextField;
    private bg: egret.Bitmap;
    private loading: egret.Bitmap;

    //这个方法如果不写在添加到舞台的事件里,会拿不到stage
    private createView(): void {
        this.stage.width = 480;
        this.stage.height = 800;
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes('loading_jpg');
        this.addChild(this.bg);

        this.loading = new egret.Bitmap();
        this.loading.texture = RES.getRes('loading2_png');
        this.loading.anchorOffsetX = this.loading.width / 2;
        this.loading.anchorOffsetY = this.loading.height / 2;
        this.loading.x = this.stage.width / 2;
        this.loading.y = this.stage.height / 2;
        this.addChild(this.loading);

        this.textField = new egret.TextField();
        this.textField.width = this.stage.width;
        this.textField.height = 50;
        this.textField.y = this.stage.height / 2;
        this.textField.textAlign = "center";
        this.addChild(this.textField);

        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        // let tw = egret.Tween.get(this.loading, { loop: true });
        // tw.to({ rotation: 360 }, 300);
    }

    private onEnterFrame() {
        this.loading.rotation += 30;
    }

    public onProgress(current: number, total: number): void {
        this.textField.text = `${Math.floor(current / total * 100)}`;
    }
}
