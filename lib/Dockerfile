FROM quay.io/afx-abu/abu-md
RUN git clone https://github.com/Arsalan010officiall/ARSLAN-MD-BOT /root/ARSLAN/
WORKDIR /root/ARSLAN/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
