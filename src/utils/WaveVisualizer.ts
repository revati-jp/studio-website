export class WaveVisualizer {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private isMobile: boolean = false;
  private previousData: number[] = [];
  private isFadingOut: boolean = false;
  private isFirstRender: boolean = true;
  private fadeInProgress: number = 0;

  constructor(canvas: HTMLCanvasElement, isMobile: boolean = false) {
    this.canvas = canvas;
    this.isMobile = isMobile;
    this.ctx = canvas.getContext("2d");
  }

  updateCanvasSize(): void {
    if (!this.canvas || !this.ctx) return;

    const container = this.canvas.parentElement!;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + "px";
    this.canvas.style.height = rect.height + "px";
    this.ctx.scale(dpr, dpr);

    // console.log(
    //   `Resize detected [${this.isMobile ? "mobile" : "desktop"}]\n` +
    //     `container: ${rect.width} x ${rect.height}\n` +
    //     `canvas: ${this.canvas.width} x ${this.canvas.height}`,
    // );
  }

  startVisualization(
    getFrequencyData: () => Uint8Array | null,
    bufferLength: number,
  ): void {
    if (!this.ctx || !this.canvas) {
      console.error("Missing required components for visualization:", {
        ctx: !!this.ctx,
        canvas: !!this.canvas,
      });
      return;
    }

    const drawSpectrum = () => {
      const dataArray = getFrequencyData();
      const isActive = !!dataArray;

      // 初期化
      if (this.previousData.length !== bufferLength) {
        this.previousData = new Array(bufferLength).fill(0);
        this.isFirstRender = true;
        this.fadeInProgress = 0;
      }

      if (!isActive) {
        this.isFadingOut = true;
      } else {
        // 音楽が再生中の場合はフェードアウト状態をリセット
        if (this.isFadingOut) {
          // フェードアウトから復帰する場合は初回描画として扱う
          this.isFirstRender = true;
          this.fadeInProgress = 0;
        }
        this.isFadingOut = false;

        // 初回フェードインの進行
        if (this.isFirstRender) {
          this.fadeInProgress = Math.min(this.fadeInProgress + 0.06, 1.0);
          if (this.fadeInProgress >= 1.0) {
            this.isFirstRender = false;
          }
        }
      }

      const sourceArray = isActive ? dataArray! : this.previousData;

      this.ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = this.canvas!.width / dpr;
      const displayHeight = this.canvas!.height / dpr;

      const barCount = bufferLength;
      let allZero = true;

      for (let i = 0; i < barCount; i++) {
        const rawValue = sourceArray[i];
        let value = rawValue / 255;

        if (this.isFadingOut) {
          const decayRate = 0.02;
          this.previousData[i] = Math.max(
            this.previousData[i] - decayRate * 255,
            0,
          );
          value = this.previousData[i] / 255;
          if (this.previousData[i] > 0.5) allZero = false;
        } else {
          this.previousData[i] = rawValue;

          // 初回フェードイン効果を適用
          if (this.isFirstRender) {
            value *= this.fadeInProgress;
          }
        }

        const boostHigh = Math.pow(i / barCount, 0.5);
        const baseLength =
          Math.pow(value, 2.5) * (0.6 + boostHigh * 1.2) +
          Math.sin(value * Math.PI * 2) * 0.1;

        let gradient: CanvasGradient;
        let x: number, y: number, width: number, height: number;

        if (this.isMobile) {
          const barHeight = displayHeight / barCount;
          const barWidth = Math.max(baseLength * displayWidth, 2); //REVIEW - もっと小さくしてもいい?

          x = 0;
          y = i * barHeight;
          width = barWidth;
          height = barHeight - 1;

          gradient = this.ctx!.createLinearGradient(0, 0, barWidth, 0);
        } else {
          const barWidth = displayWidth / barCount;
          const barHeight = Math.max(baseLength * displayHeight, 2); //REVIEW - もっと小さくしてもいい?

          x = i * barWidth;
          y = displayHeight - barHeight;
          width = barWidth - 1;
          height = barHeight;

          gradient = this.ctx!.createLinearGradient(
            0,
            displayHeight - barHeight,
            0,
            displayHeight,
          );
        }

        gradient.addColorStop(0, "rgba(240, 183, 77, 0.9)");
        gradient.addColorStop(1, "rgba(225, 100, 40, 0.9)");

        this.ctx!.fillStyle = gradient;
        this.ctx!.fillRect(x, y, width, height);
      }

      if (this.isFadingOut && allZero) {
        this.isFadingOut = false;
        this.animationId = null;
        return;
      }

      this.animationId = requestAnimationFrame(drawSpectrum);
    };

    drawSpectrum();
  }

  stopVisualization(): void {
    this.isFadingOut = true;
    // 次回再開時にフェードイン効果を適用するため
    this.isFirstRender = true;
    this.fadeInProgress = 0;
  }

  forceStopVisualization(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isFadingOut = false;
    this.previousData = [];
    this.isFirstRender = true;
    this.fadeInProgress = 0;
  }

  setMobile(isMobile: boolean): void {
    this.isMobile = isMobile;
  }

  cleanup(): void {
    this.forceStopVisualization();
    this.canvas = null;
    this.ctx = null;
  }
}
